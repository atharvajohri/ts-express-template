import express from "express";
import cors from "cors";
import expressLogger, { logger } from "./services/loggerService";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

if (!ADMIN_TOKEN) {
  logger.error(
    `Admin token not found for environment "${process.env.NODE_ENV}", exiting...`
  );
  process.exit(1);
}

//setup express admin server
const admin = express();

admin.use(cors());
admin.use(express.json());
admin.use(expressLogger);

// set ping endpoint
admin.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

const port = 3001;

admin.all("*", (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token !== ADMIN_TOKEN) {
    logger.error("[ADMIN] Invalid admin token");
    return res.status(401).send();
  }
  next();
});

admin.listen(port, () => {
  logger.info(`Admin server started at http://localhost:${port}`);
});
