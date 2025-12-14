import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./src/entity/User";
import { Sweet } from "./src/entity/Sweet";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT || 5432),
  username: process.env.DATABASE_USERNAME || "postgres",
  password: process.env.DATABASE_PASSWORD || "postgres_password",
  database: process.env.DATABASE_NAME || "sweetshop",

  synchronize: true,
  logging: false,

  // 🔥 THIS IS THE KEY FIX
  entities: [User, Sweet],

  migrations: [],
  subscribers: [],
});
