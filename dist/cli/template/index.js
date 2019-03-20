"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = _interopRequireDefault(require("util"));

var _child_process = require("child_process");

var _common = require("../../util/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const templateLocation = 'https://github.com/anduong96/Mage.git';

const bash = _util.default.promisify(_child_process.exec);

async function template() {
  const destination = `${(0, _common.getCurrentDir)()}/wwyd-project`;
  await bash(`git clone ${templateLocation} ${destination}`);
  await bash('cd wwyd-project');
}

var _default = template;
exports.default = _default;