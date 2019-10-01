import { getFuelPricesFromGov } from "../controllers/FuelPricesController";
import router from "../services/getExpressRouter";

router.get("/getFuelPricesFromGov", getFuelPricesFromGov);

export default router;
