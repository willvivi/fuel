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
  location: number[],
  radius: number
): Promise<IGasStation[]> => {
  console.log(location);
  return new Promise((resolve, reject) => {
    GasStation.find(
      {
        location: {
          $geoWithin: {
            $centerSphere: [location, radius / 6378.1],
          },
        },
      },
      (err, res) => {
        if (err) {
          console.error(err);
          reject("Could not retrieve points / Coordinates out of range");
        }
        resolve(res);
      }
    );
  });
};
