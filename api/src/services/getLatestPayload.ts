import admZip from "adm-zip";
import axios from "axios";
import fs from "fs";
import xml2js from "xml2js";
import GasStation from "../models/GasStation";

const getCurrentDate = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
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
      xml2Object()
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
          reject();
        });
      resolve();
    });
    master.on("error", reject);
  });
};

const xml2Object = (): Promise<any> => {
  const parser = new xml2js.Parser();
  let xmlBuffer: Buffer;
  console.log("Reading file: ", outputDir + "PrixCarburants_instantane.xml");
  try {
    xmlBuffer = ensureReadFileSync(outputDir + "PrixCarburants_instantane.xml");
  } catch (err) {
    console.error(err);
  }

  return new Promise((resolve, reject) => {
    parser.parseString(xmlBuffer, (err: any, result: any) => {
      if (err) {
        console.error(err);
        reject();
      }
      resolve(result["pdv_liste"]["pdv"]);

      console.log("Done");
    });
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
