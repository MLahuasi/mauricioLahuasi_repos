import { Router } from "express";
import { SeedController } from "../controllers";

const router = Router();
const ctrSeed = new SeedController();

router.get("/data", ctrSeed.seedData);

export default router;
