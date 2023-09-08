import { Router } from "express";
import { TribeController } from "../controllers";
import { validation } from "../tools";
import { validateFields } from "../middlewares";
import { check } from "express-validator";

const router = Router();
const ctrTribe = new TribeController();

//QUERY
router.get(
  "/:param",
  [
    check("param", validation.FIELS.MANDATORY("param")).not().isEmpty(),
    validateFields,
  ],
  ctrTribe.findRepositoriesByTribe
);

export default router;
