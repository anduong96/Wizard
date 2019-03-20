"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentDir = getCurrentDir;
exports.getFileContent = getFileContent;
exports.getPackageJson = getPackageJson;
exports.isValidProject = isValidProject;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description get directory path where the command was ran
 * @return {string}
 */
function getCurrentDir() {
  return process.cwd();
}
/**
 * @description get content of file if exist
 * @param {string} path of file
 * @return {string} file content
 */


function getFileContent(path) {
  if (_fs.default.existsSync(path)) {
    return _fs.default.readFileSync(path, 'utf8');
  }

  return null;
}
/**
 * Get app's package.json
 * @param {string} dir
 * @return {object}
 */


function getPackageJson(dir) {
  return JSON.parse(getFileContent(`${dir}/package.json`));
}
/**
 * @description validate project structure
 * @see ARCHITECTURE.md
 * @return {boolean} if it is a valid project
 */


function isValidProject() {
  const packageJson = getPackageJson(getCurrentDir());

  if (!packageJson) {
    console.log('package.json does not exist!');
    return false;
  }

  const hasKraken = true; //TODO: more checks

  return hasKraken;
}