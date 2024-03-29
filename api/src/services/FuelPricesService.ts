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
      (err: any, res: any) => {
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
  location: [number, number],
  radius: number
): Promise<IGasStation[]> => {
  return new Promise((resolve, reject) => {
    GasStation.aggregate(
      [
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: location,
            },
            maxDistance: radius * 1000,
            spherical: true,
            distanceField: "distance",
            distanceMultiplier: 0.001,
          },
        },
      ],
      (err: any, res: any) => {
        if (err) {
          console.error(err);
          reject("Could not retrieve points / Coordinates out of range");
        }
        resolve(res);
      }
    );
  });
};
