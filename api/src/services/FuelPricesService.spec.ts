import mongoose from "mongoose";
import {
  getFuelPricesByAddress,
  getFuelPricesAround,
} from "./FuelPricesService";
import { IGasStation } from "../models/GasStation";

describe("FuelPricesService", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://mongo:27017/fuel", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it("should return gas stations by address", async () => {
    const address: string = "55 Av du général Leclerc";
    const postcode: string = "94470";
    const city: string = "Boissy saint léger";
    const result: IGasStation[] = await getFuelPricesByAddress(
      address,
      postcode,
      city
    );
    expect(result.length).toBeGreaterThan(0);
  });

  it("should return gas stations from coordinates with a radius of 10km", async () => {
    const coordinates: number[] = [48.820063, 2.474524];
    const radius: number = 10;
    const result: IGasStation[] = await getFuelPricesAround(
      coordinates,
      radius
    );
    expect(result.length).toBeGreaterThan(0);
  });
});
