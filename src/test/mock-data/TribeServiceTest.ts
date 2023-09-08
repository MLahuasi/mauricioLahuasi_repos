import { errors } from "../../settings";
import { TribeService } from "../../services";
import { data } from "./data";

export class TribeServiceTest {
  constructor() {}

  async findRepositoriesByTribeTest(id: number) {
    try {
      const tribes = data.filter((tribe) => tribe._id == id);

      if (tribes.length == 0)
        return {
          error: "La Tribu no se encuentra registrada",
        };

      let svr = new TribeService();
      const result = await svr.buildResponse(tribes);

      if (result.length == 0)
        return {
          error:
            "La Tribu no tiene repositorios que cumplan con la cobertura necesaria",
        };

      return result;
    } catch (error) {
      const { type, message } = errors.getMessage(
        error,
        "TribeService.findRepositoriesByTribe"
      );
      if (message) throw error;

      throw new Error(`${type}|message`);
    }
  }
}
