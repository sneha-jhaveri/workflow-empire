import pino from "pino";

const redactSensitiveData = (log: any) => {
  if (log.email) {
    log.email = log.email.replace(/(.{2}).+(@.+)/, "$1***$2");
  }
  if (log.token) {
    log.token = "[REDACTED]";
  }
  return log;
};

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport:
    process.env.NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
          options: { colorize: true },
        }
      : undefined,
  hooks: {
    logMethod(inputArgs, method) {
      const redactedArgs = inputArgs.map((arg) =>
        typeof arg === "object" ? redactSensitiveData(arg) : arg
      );
      const logMessage =
        redactedArgs.length === 1
          ? redactedArgs[0]
          : JSON.stringify(redactedArgs);
      method.call(this, logMessage);
    },
  },
});
