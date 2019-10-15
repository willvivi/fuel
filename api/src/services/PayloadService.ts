import admZip from "adm-zip";
import axios from "axios";
import fs from "fs";
import parser from "xml2json";
import GasStation, { IGasStation } from "../models/GasStation";
import stations_2018 from "../../extracts/stations_2018.json";

const getCurrentDate = (): string => {
  const date = new Date();

  const currentDay =
    date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const currentMonth =
    date.getMonth() + 1 < 10 ? "0" + date.getMonth() + 1 : date.getMonth() + 1;
  const currentYear = date.getFullYear();

  return `${currentYear}${currentDay}${currentMonth}`;
};

const path = `./extracts/fuel${getCurrentDate()}.zip`;
const outputDir = `./extracts/fuel_${getCurrentDate()}/`;

const downloadAndExtractLatestPayload = async (): Promise<string> => {
  console.log("Launching job: Gas Station collection update");
  const master = fs.createWriteStream(path);
  const url = "https://donnees.roulez-eco.fr/opendata/instantane";

  return new Promise((resolve, reject) => {
    console.log("Getting latest archive from prix-carburants.gouv.fr...");
    axios({
      method: "GET",
      responseType: "stream",
      url,
    })
      .then(response => {
        response.data.pipe(master);
      })
      .catch(err => {
        console.error(err);
        reject("Couldn't fetch xml payload from prix-carburants.gouv.fr");
      });
    master.on("finish", () => {
      console.log("Finished downloading. Unzipping...");
      const zip = new admZip(path);

      try {
        ensureDirSync(outputDir);
      } catch (err) {
        console.error(err);
        reject(
          "Filesystem error. This is a server issue, please contact the administrator"
        );
      }
      zip.extractAllTo(outputDir, true);
      try {
        ensureUnlinkSync(path);
      } catch (err) {
        console.error(err);
        reject(
          "Filesystem error. This is a server issue, please contact the administrator"
        );
      }
      xml2Object()
        .then(gasStations => {
          console.log(
            "Dropping any existing data from gasstation collection..."
          );
          GasStation.deleteMany({}, err => {
            if (err !== null) {
              console.error(err);
              reject("Failed to empty collection");
            }
            console.log("Dropped gasstations collection successfully.");
            console.log(
              "Populating gasstations collection from the latest xml dump..."
            );
            const gasStationsWithGeoJSONAndNames = gasStations.map(
              (gasStation: IGasStation) => {
                const name = stations_2018.find(station => {
                  return parseInt(gasStation.id, 10) === station.id;
                });
                return {
                  nom: name ? name.Nom : "N/A",
                  marque: name ? name.Marque : "N/A",
                  location: {
                    coordinates: [
                      parseInt(gasStation.latitude, 10) / 100000,
                      parseInt(gasStation.longitude, 10) / 100000,
                    ],
                    type: "Point",
                  },
                  ...gasStation,
                };
              }
            );
            GasStation.insertMany(gasStationsWithGeoJSONAndNames, error => {
              if (err !== null) {
                console.error("err ", error);
                reject("Database update failed.");
              }
              console.log("Database successfully updated");
              resolve("Database successfully updated");
            });
          });
        })
        .catch(err => {
          reject("Couldn't parse XML");
        });
    });

    master.on("error", reject);
  });
};

const xml2Object = (): Promise<IGasStation[]> => {
  let xmlBuffer: Buffer;
  console.log(
    "Parsing XML file: ",
    outputDir + "PrixCarburants_instantane.xml"
  );
  return new Promise((resolve, reject) => {
    try {
      xmlBuffer = ensureReadFileSync(
        outputDir + "PrixCarburants_instantane.xml"
      );
    } catch (err) {
      console.error(err);
      reject();
    }
    const json: any = parser.toJson(xmlBuffer.toString("latin1"));
    console.log("Parsing done.");
    resolve(JSON.parse(json).pdv_liste.pdv);
  });
};

const ensureDirSync = (dirpath: string) => {
  try {
    fs.mkdirSync(dirpath, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err;
    }
  }
};

const ensureUnlinkSync = (filePath: string) => {
  try {
    fs.unlinkSync(path);
  } catch (err) {
    throw err;
  }
};

const ensureReadFileSync = (filePath: string): Buffer => {
  let result: Buffer;

  try {
    result = fs.readFileSync(filePath);
  } catch (err) {
    throw err;
  }

  return result;
};

export default downloadAndExtractLatestPayload;
