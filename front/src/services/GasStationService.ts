import IGasStation from "../models/GasStation";
import ISearch from "../models/Search";

const url = "http://localhost:3000/fuel";

export const getGasStationsByAddress: Function = (
  search: ISearch
): Promise<IGasStation[]> => {
  return fetch(url + "/getFuelPricesFromAddress", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `city=${search.city}&address=${search.address}&postcode=${search.postcode}`,
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<IGasStation[]>;
  });
};

export const getGasStationsByCoordinates: Function = (
  search: ISearch
): Promise<IGasStation[]> => {
  return fetch(url + "/getFuelPricesAround", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `latitude=${search.location[0]}&longitude=${search.location[1]}&radius=${search.radius}`,
  }).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<IGasStation[]>;
  });
};
