import { request, response } from "express";
import { errors, parameters } from "../../settings";

export class MockCategoriaController {
  async findAll(req = request, res = response) {
    try {
      const repositorios = {
        repositories: [
          {
            id: 1,
            state: 604,
          },
          {
            id: 2,
            state: 605,
          },
          {
            id: 3,
            state: 606,
          },
        ],
      };
      return res.status(200).json({
        repositorios,
      });
    } catch (error) {
      return errors.throwError(error, res, "MockCategoriaController.findAll");
    }
  }
}
