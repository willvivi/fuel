import downloadAndExtractLatestPayload from "./PayloadService";
import mongoose from "mongoose";

describe("PayloadService", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://mongo:27017/fuel");
  });

  it.skip("should return successful database update", async () => {
    const result: string = await downloadAndExtractLatestPayload();
    expect(result).toEqual("Database successfully updated");
  }, 60000);
});
