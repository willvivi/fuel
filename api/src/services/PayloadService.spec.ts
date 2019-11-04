import downloadAndExtractLatestPayload from "./PayloadService";
import mongoose from "mongoose";

describe("PayloadService", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://mongo:27017/fuel", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it("should return successful database update", async () => {
    const result = await downloadAndExtractLatestPayload();
    expect(result).toEqual("Database successfully updated");
  }, 60000);
});
