const express = require("express");
const globalErrorHandler = require("./utils/globalErrorHandler");
const applyMiddleware = require("./middlewares");
require("dotenv").config();
const app = express();

applyMiddleware(app);

const usersRoutes = require("./routes/users");
app.use(usersRoutes);

app.get("/health", (_req, res) => {
  res.send({ message: "Server is running...." });
});

app.all("*", (req, _res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.status = 404;
  next(error);
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
