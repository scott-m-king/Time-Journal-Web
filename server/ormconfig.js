const dotenv = require("dotenv");
dotenv.config();

let options = {};
if (process.env.DATABASE_URL) {
  options = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    extra: {
      ssl: true,
    },
    entities: ["src/entity/**/*.ts"],
  };
} else {
  options = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "scottking",
    password: "password",
    database: "time-journal",
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  };
}

module.exports = options;
