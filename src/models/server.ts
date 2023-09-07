import express, { Application } from "express";
import cors from "cors";
import { parameters } from "../settings";
import { AppDataSource } from "./db/datasource";

import mockRoutes from "../routes/mock.route";

class Server {
  private app: Application;
  private port: string;
  private hostname?: string;

  private apiPaths = {
    mock: "/api/mock",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "";
    this.hostname = process.env.HOST_NAME;

    //Conectar a Base de Datos
    this.connectDatabase();

    // //Middlewares
    this.middlewares();

    // //Rutas aplicacion
    this.routes();
  }

  // Configurar Data Base en el Servidor
  async connectDatabase() {
    AppDataSource.initialize()
      .then(() => {
        console.log("Data Base ha sido inicializada!");
      })
      .catch((err) => {
        console.error(
          "Error durante la inicialización de la Base de Datos:",
          err
        );
      });
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());

    //aceso a la carpeta statica [public]
    this.app.use(express.static(parameters.STATIC_FOLDER));
  }

  //RUTAS
  routes() {
    this.app.use(this.apiPaths.mock, mockRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(parameters.MESSAGE_PORT_LISTEN(this.port));
      console.log(parameters.HOST(this.hostname!, this.port));
      const propertyValues = Object.values(this.apiPaths);
    });
  }
}

export default Server;
