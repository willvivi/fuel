import mongoose from "mongoose";
import { getFuelPricesByCity, getFuelPricesAround } from "./FuelPricesService";
import { IGasStation } from "../models/GasStation";

describe("FuelPricesService", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://mongo:27017/fuel", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it("should return gas stations by city", async () => {
    const city: string = "Paris";
    const result: IGasStation[] = await getFuelPricesByCity(city);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should return gas stations from coordinates with a radius of 10km", async () => {
    const coordinates: number[] = [48.820063, 2.474524];
    const radius: number = 10;
    const result: IGasStation[] = await getFuelPricesAround(
      coordinates,
      radius
    );
    console.log(result[0]);
    expect(result.length).toBeGreaterThan(0);
  });
});
