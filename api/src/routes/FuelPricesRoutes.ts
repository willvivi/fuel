import {
  getFuelPricesFromGov,
  getFuelPricesFromCity,
  getFuelPricesAround,
} from "../controllers/FuelPricesController";
import router from "../services/ExpressRouterService";
import cors from "cors";

router.use(cors());
router.get("/getFuelPricesFromGov", getFuelPricesFromGov);
router.post("/getFuelPricesByCity", getFuelPricesFromCity);
router.post("/getFuelPricesAround", getFuelPricesAround);

export default router;
