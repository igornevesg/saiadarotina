type LogLevel = "info" | "warn" | "error" | "audit";

function write(level: LogLevel, message: string, data?: unknown) {
  const entry = {
    level,
    timestamp: new Date().toISOString(),
    message,
    data,
  };

  console[level === "audit" ? "log" : level](entry);
}

export const logger = {
  info: (m: string, d?: unknown) => write("info", m, d),
  warn: (m: string, d?: unknown) => write("warn", m, d),
  error: (m: string, d?: unknown) => write("error", m, d),
  audit: (m: string, d?: unknown) => write("audit", m, d),
};