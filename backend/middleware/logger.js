const fs = require("fs");
const path = require("path");

const logsDir = path.join(__dirname, "../logs");
const requestLogPath = path.join(logsDir, "request.log");
const errorLogPath = path.join(logsDir, "error.log");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const requestLogger = (req, res, next) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    body: req.body,
  };

  fs.appendFile(requestLogPath, JSON.stringify(logEntry) + "\n", (err) => {
    if (err) console.error("Erro ao registrar request log:", err);
  });

  next();
};

const errorLogger = (err, req, res, next) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    statusCode: err.statusCode || 500,
    message: err.message,
  };

  fs.appendFile(errorLogPath, JSON.stringify(logEntry) + "\n", (error) => {
    if (error) console.error("Erro ao registrar error log:", error);
  });

  next(err);
};

module.exports = {
  requestLogger,
  errorLogger,
};
