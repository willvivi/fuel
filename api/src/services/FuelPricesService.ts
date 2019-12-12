import GasStation, { IGasStation } from "../models/GasStation";

export const getFuelPricesByAddress = async (
  address: string,
  postcode: string,
  city: string
): Promise<IGasStation[]> => {
  return new Promise((resolve, reject) => {
    GasStation.find(
      {
        ville: { $regex: ".*" + city + ".*", $options: "i" },
        cp: { $regex: "^" + postcode + ".*", $options: "i" },
        adresse: { $regex: ".*" + address + ".*", $options: "i" },
      },
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
