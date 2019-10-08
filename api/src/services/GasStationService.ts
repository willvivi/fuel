import GasStation, { IGasStation } from "../models/GasStation";

export const getGasStationByCity = async (
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
