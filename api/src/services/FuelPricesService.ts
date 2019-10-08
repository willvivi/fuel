import GasStation, { IGasStation, IGeoJSON } from "../models/GasStation";

export const getFuelPricesByCity = async (
  city: string
): Promise<IGasStation[]> => {
  return new Promise((resolve, reject) => {
    GasStation.find(
      { ville: { $regex: ".*" + city + ".*", $options: "i" } },
      (err, res) => {
        if (err) {
          console.error(err);
          reject();
        }
        resolve(res);
      }
    );
  });
};

export const getFuelPricesAround = async (
  location: IGeoJSON
): Promise<IGasStation[]> => {
  return new Promise((resolve, reject) => {
    GasStation.geoSearch(
      { type: "Point" },
      { near: location.coordinates, maxDistance: 7 },
      (err, res) => {
        if (err) {
          console.error("Could not retrieve points / out of range");
          reject();
        }
        resolve(res);
      }
    );
  });
};
