import {
  getFuelPricesFromGov,
  getFuelPricesFromCity,
} from "../controllers/FuelPricesController";
import router from "../services/ExpressRouterService";

router.get("/getFuelPricesFromGov", getFuelPricesFromGov);
router.post("/getGasStationsPerCity", getFuelPricesFromCity);

export default router;
