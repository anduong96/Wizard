"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gulp = _interopRequireDefault(require("gulp"));

var _vinylNamed = _interopRequireDefault(require("vinyl-named"));

var _webpackStream = _interopRequireDefault(require("webpack-stream"));

var _gulpSourcemaps = _interopRequireDefault(require("gulp-sourcemaps"));

var _gulpNodemon = _interopRequireDefault(require("gulp-nodemon"));

var _chalk = _interopRequireDefault(require("chalk"));

var _common = require("../../util/common");

var _dev = _interopRequireDefault(require("../../webpack/dev.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function development() {
  if (!(0, _common.isValidProject)()) {
    console.log(_chalk.default.redBright.bold('Invalid project.'));
    return;
  }

  const dir = (0, _common.getCurrentDir)();
  const packageJson = (0, _common.getPackageJson)(dir);
  const wwyd = packageJson.wwyd || {};
  const watch = wwyd.watch || [];
  const ignore = wwyd.ignore || [];
  const entry = wwyd.entry || `${dir}/index.js`;
  const output = `${dir}/development/dist`;
  const config = (0, _dev.default)({
    output,
    entry
  });

  _gulp.default.src(`${dir}/${wwyd.client || 'client/app/index.js'}`).pipe((0, _vinylNamed.default)()).pipe((0, _webpackStream.default)({
    config
  })).pipe(_gulpSourcemaps.default.init()).pipe(_gulpSourcemaps.default.write('.')).pipe(_gulp.default.dest(output));

  (0, _gulpNodemon.default)({
    script: `${dir}/index.js`,
    ext: 'js',
    watch: watch.map(f => `${dir}/${f}`),
    ignore: ignore.map(f => `${dir}/${f}`),
    verbose: true,
    legacyWatch: true,
    restartable: 'rs'
  });
}

var _default = development;
exports.default = _default;