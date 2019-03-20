"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commands = _interopRequireDefault(require("./commands"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  _ = []
}) => {
  const arg = _[0];

  if (_commands.default.hasOwnProperty(arg)) {
    return _commands.default[arg].action();
  }

  return console.log('Invalid command. Use help instead');
};

exports.default = _default;