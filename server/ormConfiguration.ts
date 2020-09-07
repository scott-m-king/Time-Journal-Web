import {
  getConnectionOptions,
  ConnectionOptions,
  createConnection,
} from "typeorm";
import dotenv from "dotenv";

export const connectTypeorm = async () => {
  dotenv.config();
  const getOptions = async () => {
    let connectionOptions: ConnectionOptions;
    connectionOptions = {
      type: "postgres",
      synchronize: true,
      logging: false,
      extra: {
        ssl: true,
      },
      entities: ["dist/entity/*.*"],
    };
    if (process.env.DATABASE_URL) {
      Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
    } else {
      connectionOptions = await getConnectionOptions();
    }

    return connectionOptions;
  };

  const connect2Database = async (): Promise<void> => {
    const typeormconfig = await getOptions();
    await createConnection(typeormconfig);
  };

  connect2Database().then(async () => {
    console.log("Connected to database");
  });
};
