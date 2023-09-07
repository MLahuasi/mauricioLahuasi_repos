import { request, response } from "express";
import { OrganizationService } from "../services";
import { errors, parameters } from "../settings";
import { isNumber } from "../tools/validations";

export class OrganizationController {
  async create(req = request, res = response) {
    try {
      const serv: OrganizationService = new OrganizationService();
      const { name, status } = req.body;
      if (!isNumber(status))
        throw new Error(`Status value: ${status} is invalid`);

      const organization = await serv.create({ name, status });
      return res.status(200).json({
        ...parameters.OK,
        organization,
      });
    } catch (error) {
      return errors.throwError(error, res, "OrganizationController.create");
    }
  }

  async findAll(req = request, res = response) {
    try {
      const serv: OrganizationService = new OrganizationService();

      const organization = await serv.findAll();
      return res.status(200).json({
        ...parameters.OK,
        organization,
      });
    } catch (error) {
      return errors.throwError(error, res, "OrganizationController.findAll");
    }
  }

  async update(req = request, res = response) {
    try {
      const serv: OrganizationService = new OrganizationService();
      const { id } = req.params;
      const { name, status } = req.body;

      if (!isNumber(id)) throw new Error(`Id value: ${id} is invalid`);

      if (!isNumber(status))
        throw new Error(`Status value: ${status} is invalid`);

      const organization = await serv.update({
        name,
        status,
        _id: Number(id),
      });
      return res.status(200).json({
        ...parameters.OK,
        organization,
      });
    } catch (error) {
      return errors.throwError(error, res, "OrganizationController.update");
    }
  }

  async delete(req = request, res = response) {
    try {
      const serv: OrganizationService = new OrganizationService();
      const { id } = req.params;

      if (!isNumber(id)) throw new Error(`Id value: ${id} is invalid`);

      await serv.delete(Number(id));

      return res.status(200).json({
        ...parameters.OK,
      });
    } catch (error) {
      return errors.throwError(error, res, "OrganizationController.delete");
    }
  }
}
