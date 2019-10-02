import downloadAndExtractLatestPayload from "../services/getLatestPayload";
import { Response } from "express";

export const getFuelPricesFromGov = (req: any, res: Response) => {
  downloadAndExtractLatestPayload()
    .then(jobResult => {
      res.send({ message: jobResult });
    })
    .catch(reason => {
      res.status(500).send({ message: reason });
    });
};
