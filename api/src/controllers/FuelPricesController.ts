import downloadAndExtractLatestPayload from "../services/getLatestPayload";

export const getFuelPricesFromGov = (req: any, res: any) => {
  downloadAndExtractLatestPayload().then(() => {
    res.send({ message: "OK" });
  });
};
