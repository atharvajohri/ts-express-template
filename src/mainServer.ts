import express from "express";
import cors from "cors";
import expressLogger, { logger } from "./services/loggerService";
import { API_PREFIX } from "./common/constants";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(expressLogger);

// set ping endpoint
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

app.listen(port, () => {
  logger.info(`Server started at http://localhost:${port}`);
});
