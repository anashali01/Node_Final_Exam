import { Router } from "express";
import dashboardRouter from "./dashboardRouter.js";
import categoryRouter from "./categoryRouter.js";
import productRouter from "./productRouter.js";

const router = Router();

router.use('/', dashboardRouter);
router.use('/', categoryRouter);
router.use('/', productRouter);

export default router;