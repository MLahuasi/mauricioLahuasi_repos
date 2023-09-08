import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { URL } from "url";

dotenv.config();

const dbUrl = new URL(process.env.DATABASE_URL || "");
dbUrl.searchParams.delete("options");

export const AppDataSource = new DataSource({
  type: "cockroachdb",
  url: dbUrl.toString() || " ",
  timeTravelQueries: false,
  ssl: true,
  synchronize: true,
  logging: false,
  entities: ["src/models/db/entities/**/*.ts"],
  // migrations: ["src/migrations/**/*.ts"],
  // subscribers: ["src/subscriber/**/*.ts"],
});

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   synchronize: true,
//   logging: false,
//   entities: ["./src/models/db/entities/**/*.ts"],
//   migrations: ["./src/migrations/**/*.ts"],
//   // subscribers: [],
// });
