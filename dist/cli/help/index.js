"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _console = _interopRequireDefault(require("console.table"));

var _commands = _interopRequireDefault(require("../commands"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function help() {
  console.log(_chalk.default.blueBright.bold('Command Usage:\n'));
  console.table(Object.entries(_commands.default).map(keypair => {
    const [command, value] = keypair;
    return {
      Command: command,
      Action: value.explain
    };
  }));
  console.log(_chalk.default.blue.bold('\n\nExample:\n'));
  console.log('wwyd dev');
  console.log('\n\n');
}

var _default = help;
exports.default = _default;