import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import FuelPricesRoutes from "./routes/FuelPricesRoutes";

const app = express();
const port = 8080 || process.env.PORT;

mongoose.connect("mongodb://mongo:27017/fuel", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("open", () => {
  console.log("db open");
});

app.listen(port, () => {
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
