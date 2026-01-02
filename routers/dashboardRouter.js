import { Router } from "express";
import dashboardCtl from "../controller/dashboardCtl.js";

const dashboardRouter = Router();

dashboardRouter.get('/',dashboardCtl.dashboardPage);

export default dashboardRouter;