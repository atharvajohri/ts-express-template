import { HEADER_RENEWED_TOKEN_KEY, HEADER_TOKEN_KEY } from "@/common/constants";
import pino from "pino";
import pinoHttp from "pino-http";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
  },
});

export default pinoHttp({
  logger,
  redact: [
    `req.headers["${HEADER_TOKEN_KEY}"]`,
    `req.headers["${HEADER_TOKEN_KEY.toLocaleLowerCase()}"]`,
    `req.headers["${HEADER_RENEWED_TOKEN_KEY}"]`,
    `req.headers["${HEADER_RENEWED_TOKEN_KEY.toLocaleLowerCase()}"]`,
    `res.headers["${HEADER_TOKEN_KEY}"]`,
    `res.headers["${HEADER_TOKEN_KEY.toLocaleLowerCase()}"]`,
    `res.headers["${HEADER_RENEWED_TOKEN_KEY}"]`,
    `res.headers["${HEADER_RENEWED_TOKEN_KEY.toLocaleLowerCase()}"]`,
  ],
});
export { logger };
