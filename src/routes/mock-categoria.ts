import { Router } from "express";
import { MockCategoriaController } from "../controllers";

const router = Router();
const mock = new MockCategoriaController();

router.get("/getAll", [], mock.findAll);

export default router;
