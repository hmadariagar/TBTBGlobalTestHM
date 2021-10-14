"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConnetion = void 0;
Object.defineProperty(exports, "sql", {
  enumerable: true,
  get: function get() {
    return _mssql["default"];
  }
});

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mssql = _interopRequireDefault(require("mssql"));

var _config = _interopRequireDefault(require("../config"));

var user = _config["default"].user,
    password = _config["default"].password,
    server = _config["default"].server,
    database = _config["default"].database;
var dbsetting = {
  user: user,
  password: password,
  server: server,
  database: database,
  options: {
    encrypt: true,
    // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs

  }
};

var getConnetion = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var pool;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _mssql["default"].connect(dbsetting);

          case 3:
            pool = _context.sent;
            return _context.abrupt("return", pool);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log("error" + _context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getConnetion() {
    return _ref.apply(this, arguments);
  };
}();

exports.getConnetion = getConnetion;