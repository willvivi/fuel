import downloadAndExtractPayload from "./PayloadService";
import mongoose from "mongoose";

const dbURL: string =
  "mongodb://mongo" +
  process.env.DB_USER +
  "@" +
  process.env.DB_PASSWORD +
  ":27017/fuel";

const date = new Date();

console.log(
  `CRON FUEL: ${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} at ${
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}:${
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
  }`
);

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("open", () => {
  console.log("DB Open");
  downloadAndExtractPayload()
    .then((msg) => {
      console.log(msg);
      if (process.env.NODE_ENV === "production") {
        process.exit();
      }
    })
    .catch((err) => {
      console.log(err);
      if (process.env.NODE_ENV === "production") {
        process.exit(1);
      }
    });
});
