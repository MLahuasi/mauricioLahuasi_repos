import { Router } from "express";
import { OrganizationController } from "../controllers";
import { check } from "express-validator";
import { validation } from "../tools";
import { validateFields } from "../middlewares";

const router = Router();
const ctrOrganization = new OrganizationController();

//CREATE
router.post(
  "/",
  [
    check("name", validation.FIELS.MANDATORY("name")).not().isEmpty(),
    check("status", validation.FIELS.MANDATORY("status"))
      .not()
      .isEmpty()
      .isIn([1, 0])
      .withMessage(validation.FIELS.OUT_OF_RANGE("status")),
    validateFields,
  ],
  ctrOrganization.create
);

//READ
router.get("/all", [], ctrOrganization.findAll);

//UPDATE
router.put(
  "/:id",
  [
    check("id", validation.FIELS.MANDATORY("id")).not().isEmpty(),
    check("name", validation.FIELS.MANDATORY("name")).not().isEmpty(),
    check("status", validation.FIELS.MANDATORY("status"))
      .not()
      .isEmpty()
      .isIn([1, 0])
      .withMessage(validation.FIELS.OUT_OF_RANGE("status")),
    validateFields,
  ],
  ctrOrganization.update
);

//DELETE
router.delete(
  "/:id",
  [
    check("id", validation.FIELS.MANDATORY("id")).not().isEmpty(),
    validateFields,
  ],
  ctrOrganization.delete
);

export default router;
