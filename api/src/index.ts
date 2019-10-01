import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import FuelPricesRoutes from "./routes/FuelPricesRoutes";

const app = express();
const port = 8080 || process.env.PORT;

mongoose.connect("mongodb://localhost:27017/fuel", { useNewUrlParser: true });

mongoose.connection.on("open", () => {
  // tslint:disable-next-line: no-console
  console.log("db open");
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use("/fuel", FuelPricesRoutes);

app.get("/", (req, res) => {
  res.send({});
});

export default app;
