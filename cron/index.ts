import downloadAndExtractPayload from "./PayloadService";
import mongoose from "mongoose";

const dbURL: string = "mongodb://mongo:27017/fuel";

const date = new Date();

console.log(
  `CRON FUEL: ${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getDate()} at ${date.getHours()}:${date.getMinutes()}:${
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  }`
);

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
