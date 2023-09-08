import { request, response } from "express";
import { TribeService } from "../services";
import { errors } from "../settings";

export class TribeController {
  async findRepositoriesByTribe(req = request, res = response) {
    try {
      const serv: TribeService = new TribeService();
      const { param } = req.params;

      const repositories = await serv.findRepositoriesByTribe(param);
      return res.status(200).json({
        repositories,
      });
    } catch (error) {
      return errors.throwError(
        error,
        res,
        "TribeController.findRepositoriesByTribe"
      );
    }
  }
}
