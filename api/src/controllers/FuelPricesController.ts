import downloadAndExtractLatestPayload from "../services/PayloadService";
import { getFuelPricesByCity } from "../services/FuelPricesService";
import { Response, Request } from "express";

export const getFuelPricesFromGov = (req: Request, res: Response) => {
  downloadAndExtractLatestPayload()
    .then(jobResult => {
      res.send({ message: jobResult });
    })
    .catch(reason => {
      res.status(500).send({ error: reason });
    });
};

export const getFuelPricesFromCity = (req: Request, res: Response) => {
  if (req.body.city) {
    getFuelPricesByCity(req.body.city)
      .then(gasStations => {
        res.send(gasStations);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } else {
    res.status(400).send({ error: "Bad request" });
  }
};

export const getFuelPricesAround = (req: Request, res: Response) => {
  if (req.body.location) {
    getFuelPricesByCity(req.body.location)
      .then(gasStations => {
        res.send(gasStations);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } else {
    res.status(400).send({ error: "Bad request" });
  }
};
