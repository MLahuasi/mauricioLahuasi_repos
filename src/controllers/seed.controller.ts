import { request, response } from "express";
import { SeedService } from "../services";
import { errors } from "../settings";

export class SeedController {
  async seedData(req = request, res = response) {
    try {
      const serv: SeedService = new SeedService();
      const {} = req.body;
      const seed = await serv.start();
      return res.status(200).json({
        seed,
      });
    } catch (error) {
      return errors.throwError(error, res, "SeedController.seedData");
    }
  }
}
