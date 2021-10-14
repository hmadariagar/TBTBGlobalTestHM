"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _config = _interopRequireDefault(require("./config"));

var _app = _interopRequireDefault(require("./app"));

var PORT = _config["default"].PORT;

_app["default"].listen(PORT, function () {
  console.log("Server listening at http://localhost:".concat(PORT));
});