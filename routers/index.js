import { Router } from "express";
import dashboardRouter from "./dashboardRouter.js";

const router = Router()

router.use('/',dashboardRouter);

export default router;