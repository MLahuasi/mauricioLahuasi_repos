module.exports = {
  type: "cockroachdb",
  url: "postgresql://jmlq:a08DFzLDXbzEr-nthY_rCQ@silkie-tadpole-5254.g8z.cockroachlabs.cloud:26257/jmlq-test-globant?sslmode=verify-full",
  timeTravelQueries: false,
  ssl: true,
  synchronize: true,
  logging: false,
  entities: ["src/models/db/entities/**/*.ts"],
  // migrations: ["src/migrations/**/*.ts"],
  // subscribers: ["src/subscriber/**/*.ts"],
};
