"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserbyID = exports.showAllUsers = exports.removeEmployeeFromProject = exports.findUserbyID = exports.deleteUserbyID = exports.createNewUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connection = require("../connection/connection");

var showAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var pool, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _connection.getConnetion)();

          case 3:
            pool = _context.sent;
            _context.next = 6;
            return pool.request().query("SELECT * FROM Users");

          case 6:
            result = _context.sent;
            return _context.abrupt("return", {
              status: 200,
              response: result.recordset
            });

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", {
              status: 500,
              response: "Error Interno del Servidor"
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function showAllUsers() {
    return _ref.apply(this, arguments);
  };
}();

exports.showAllUsers = showAllUsers;

var createNewUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var firstName, lastName, email, professionId, pool;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            firstName = body.firstName, lastName = body.lastName, email = body.email, professionId = body.professionId;

            if (!(!firstName || !lastName || !email || !professionId)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", {
              status: 400,
              response: "Campos Incompletos"
            });

          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return (0, _connection.getConnetion)();

          case 6:
            pool = _context2.sent;
            _context2.next = 9;
            return pool.request().input("firstName", _connection.sql.VarChar(40), firstName).input("lastName", _connection.sql.VarChar(40), lastName).input("email", _connection.sql.VarChar(50), email).input("professionId", _connection.sql.Int, professionId).query("INSERT INTO Users (firstName, lastName, email, professionId) VALUES (@firstName, @lastName, @email, @professionId)");

          case 9:
            return _context2.abrupt("return", {
              status: 200,
              response: body
            });

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](3);
            return _context2.abrupt("return", {
              status: 500,
              response: "Error Interno del Servidor"
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 12]]);
  }));

  return function createNewUser(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createNewUser = createNewUser;

var findUserbyID = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(params) {
    var id, pool, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return (0, _connection.getConnetion)();

          case 4:
            pool = _context3.sent;
            _context3.next = 7;
            return pool.request().input("id", id).query("SELECT * FROM Users WHERE Id = @id");

          case 7:
            result = _context3.sent;

            if (!(result.recordset.length === 0)) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", {
              status: 400,
              response: "El usuario de Id:".concat(id, " no se encuentra registrado")
            });

          case 10:
            return _context3.abrupt("return", {
              status: 200,
              response: result.recordset[0]
            });

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", {
              status: 500,
              response: _context3.t0
            });

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 13]]);
  }));

  return function findUserbyID(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.findUserbyID = findUserbyID;

var deleteUserbyID = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(params) {
    var id, pool, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return removeEmployeeFromProject(params);

          case 4:
            _context4.next = 6;
            return (0, _connection.getConnetion)();

          case 6:
            pool = _context4.sent;
            _context4.next = 9;
            return pool.request().input("userId", id).query("DELETE FROM [Users] WHERE [id] = @userId");

          case 9:
            result = _context4.sent;

            if (!(result.rowsAffected[0] === 0)) {
              _context4.next = 14;
              break;
            }

            return _context4.abrupt("return", {
              status: 200,
              response: "El usuario de Id:".concat(id, " no se encuentra registrado")
            });

          case 14:
            return _context4.abrupt("return", {
              status: 200,
              response: "El usuario fue removido con éxito"
            });

          case 15:
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](1);
            return _context4.abrupt("return", {
              status: 500,
              response: _context4.t0
            });

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 17]]);
  }));

  return function deleteUserbyID(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteUserbyID = deleteUserbyID;

var removeEmployeeFromProject = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(params) {
    var id, pool, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return (0, _connection.getConnetion)();

          case 4:
            pool = _context5.sent;
            _context5.next = 7;
            return pool.request().input("userId", id).query("DELETE FROM [AssignedProjects] WHERE [userId] = @userId");

          case 7:
            result = _context5.sent;

            if (!(result.rowsAffected[0] === 0)) {
              _context5.next = 12;
              break;
            }

            return _context5.abrupt("return", {
              status: 204,
              response: "Este usuario no se encuentra asociado a un Proyecto"
            });

          case 12:
            return _context5.abrupt("return", {
              status: 200,
              response: "El usuario fue removido de ".concat(result.rowsAffected[0], " Proyectos")
            });

          case 13:
            _context5.next = 18;
            break;

          case 15:
            _context5.prev = 15;
            _context5.t0 = _context5["catch"](1);
            return _context5.abrupt("return", {
              status: 500,
              response: _context5.t0
            });

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 15]]);
  }));

  return function removeEmployeeFromProject(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

exports.removeEmployeeFromProject = removeEmployeeFromProject;

var updateUserbyID = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req) {
    var body, params, firstName, lastName, email, professionId, id, dataUser, pool;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            body = req.body, params = req.params;
            firstName = body.firstName, lastName = body.lastName, email = body.email, professionId = body.professionId;
            id = params.id;
            _context6.prev = 3;
            _context6.next = 6;
            return findUserbyID(params);

          case 6:
            dataUser = _context6.sent;

            if (!(dataUser.status === 400)) {
              _context6.next = 9;
              break;
            }

            return _context6.abrupt("return", dataUser);

          case 9:
            _context6.next = 11;
            return (0, _connection.getConnetion)();

          case 11:
            pool = _context6.sent;
            _context6.next = 14;
            return pool.request().input("firstName", _connection.sql.VarChar(40), firstName || dataUser.response.firstName).input("lastName", _connection.sql.VarChar(40), lastName || dataUser.response.lastName).input("professionId", _connection.sql.Int, professionId || dataUser.response.professionId).input("email", _connection.sql.VarChar(50), email || dataUser.response.email).input("IdUser", id).query("UPDATE [Users] SET [firstName] = @firstName, [lastName] = @lastName, [professionId] = @professionId, [email] = @email WHERE [id] = @IdUser");

          case 14:
            _context6.next = 16;
            return findUserbyID(params);

          case 16:
            return _context6.abrupt("return", _context6.sent);

          case 19:
            _context6.prev = 19;
            _context6.t0 = _context6["catch"](3);
            return _context6.abrupt("return", {
              status: 500,
              response: "Error Interno del Servidor"
            });

          case 22:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[3, 19]]);
  }));

  return function updateUserbyID(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateUserbyID = updateUserbyID;