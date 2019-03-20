"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = ({
  publicPath
}) => ({
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  noInfo: true,
  hot: true,
  open: 'chrome',
  publicPath,
  watchOptions: {
    poll: 1000
  },
  stats: {
    all: false,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    moduleTrace: true,
    errorDetails: true
  }
});

exports.default = _default;