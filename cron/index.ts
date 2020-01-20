import downloadAndExtractPayload from "./PayloadService";
import mongoose from "mongoose";

const dbURL: string = "mongodb://mongo:27017/fuel";

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
      if (process.env.NODE_ENV === "production") {
        process.exit();
      }
    })
    .catch(err => {
      console.log(err);
      if (process.env.NODE_ENV === "production") {
        process.exit(1);
      }
    });
});
