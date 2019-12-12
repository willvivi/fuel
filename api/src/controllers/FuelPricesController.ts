import downloadAndExtractLatestPayload from "../services/PayloadService";
import {
  getFuelPricesByAddress as getByAddress,
  getFuelPricesAround as getAround,
} from "../services/FuelPricesService";
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

export const getFuelPricesFromAddress = (req: Request, res: Response) => {
  if (req.body.city || req.body.address || req.body.postcode) {
    getByAddress(req.body.address, req.body.postcode, req.body.city)
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
  if (req.body.longitude && req.body.latitude) {
    getAround(
      [parseFloat(req.body.latitude), parseFloat(req.body.longitude)],
      req.body.radius ? parseInt(req.body.radius, 10) : 20
    )
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
