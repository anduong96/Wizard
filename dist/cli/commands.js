"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _prod = _interopRequireDefault(require("./prod"));

var _dev = _interopRequireDefault(require("./dev"));

var _template = _interopRequireDefault(require("./template"));

var _help = _interopRequireDefault(require("./help"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  dev: {
    action: () => (0, _dev.default)(),
    explain: 'Build development distribution and start dev server'
  },
  prod: {
    action: () => (0, _prod.default)(),
    explain: 'Build production distribution'
  },
  template: {
    action: () => (0, _template.default)(),
    explain: 'Create a default MERN template'
  },
  help: {
    action: () => (0, _help.default)(),
    explain: 'Display all commands'
  }
};
exports.default = _default;