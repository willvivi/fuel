const url = "http://localhost:3000/fuel";

export const getGasStationsByCity: any = async (city: string) => {
  const response = await fetch(url + "/getFuelPricesByCity", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `city=${city}`,
  });
  return await response.json();
};
