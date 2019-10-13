import downloadAndExtractLatestPayload from "../services/PayloadService";
import {
  getFuelPricesByCity as getByCity,
  getFuelPricesAround as getAround,
} from "../services/FuelPricesService";
import { Response, Request } from "express";
import { parse } from "querystring";

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
    getByCity(req.body.city)
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
