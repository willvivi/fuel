import downloadAndExtractPayload from "./PayloadService";
import mongoose from "mongoose";

const dbURL: string = "mongodb://localhost:27017/fuel";

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("Connecting to DB: ", dbURL);

mongoose.connection.on("open", () => {
  console.log("DB Open");
  downloadAndExtractPayload()
    .then(msg => {
      console.log(msg);
    })
    .catch(err => {
      console.log(err);
    });
});
