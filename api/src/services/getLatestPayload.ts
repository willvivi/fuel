import admZip from "adm-zip";
import axios from "axios";
import fs from "fs";
import parser from "xml2json";
import GasStation, { IGasStation } from "../models/GasStation";

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

const downloadAndExtractLatestPayload = async (): Promise<any> => {
  const master = fs.createWriteStream(path);
  const url = "https://donnees.roulez-eco.fr/opendata/instantane";
  const response = await axios({
    method: "GET",
    responseType: "stream",
    url,
  });

  response.data.pipe(master);

  return new Promise((resolve, reject) => {
    master.on("finish", () => {
      const zip = new admZip(path);
      try {
        ensureDirSync(outputDir);
      } catch (err) {
        console.error(err);
        reject();
      }
      zip.extractAllTo(outputDir, true);
      try {
        ensureUnlinkSync(path);
      } catch (err) {
        console.error(err);
        reject();
      }
      storeInDB(xml2Object())
        .then(() => {
          resolve();
        })
        .catch(() => {
          // reject();
        });
      resolve();
    });
    master.on("error", reject);
  });
};

const xml2Object = (): IGasStation[] => {
  let xmlBuffer: Buffer;
  console.log("Reading file: ", outputDir + "PrixCarburants_instantane.xml");
  try {
    xmlBuffer = ensureReadFileSync(outputDir + "PrixCarburants_instantane.xml");
  } catch (err) {
    console.error(err);
  }

  const json: any = parser.toJson(xmlBuffer.toString());
  return JSON.parse(json).pdv_liste.pdv;
};

const storeInDB = (stations: IGasStation[]): Promise<IGasStation[]> => {
  return GasStation.insertMany(stations);
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
