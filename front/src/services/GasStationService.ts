import IGasStation from "../models/GasStation";

const url = "http://localhost:3000/fuel";

export const getGasStationsByCity: Function = (
  city: string
): Promise<IGasStation[]> => {
  return fetch(url + "/getFuelPricesByCity", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `city=${city}`,
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<IGasStation[]>;
  });
};
