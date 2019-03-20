"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gulp = _interopRequireDefault(require("gulp"));

var _vinylNamed = _interopRequireDefault(require("vinyl-named"));

var _webpackStream = _interopRequireDefault(require("webpack-stream"));

var _chalk = _interopRequireDefault(require("chalk"));

var _common = require("../../util/common");

var _prod = _interopRequireDefault(require("../../webpack/prod.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function production() {
  if (!(0, _common.isValidProject)()) {
    console.log(_chalk.default.redBright.bold('Invalid project.'));
    return;
  }

  const dir = (0, _common.getCurrentDir)();
  const packageJson = (0, _common.getPackageJson)(dir);
  const wwyd = packageJson.wwyd || {};
  const output = `${dir}/production/dist`;
  const config = (0, _prod.default)({
    location: output
  });

  _gulp.default.src(`${dir}/${wwyd.client || 'client/app/index.js'}`).pipe((0, _vinylNamed.default)()).pipe((0, _webpackStream.default)({
    config
  })).pipe(minify()).pipe(gzip()).pipe(_gulp.default.dest(output));
}

var _default = production;
exports.default = _default;