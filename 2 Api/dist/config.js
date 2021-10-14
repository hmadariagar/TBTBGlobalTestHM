"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var _default = {
  PORT: process.env.PORT || 3000,
  user: process.env.user || "",
  password: process.env.password || "",
  server: process.env.server || "",
  database: process.env.database || ""
};
exports["default"] = _default;