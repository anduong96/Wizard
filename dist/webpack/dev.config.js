"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpack = _interopRequireDefault(require("webpack"));

var _momentLocalesWebpackPlugin = _interopRequireDefault(require("moment-locales-webpack-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  output,
  entry
}) => ({
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: ['eventsource-polyfill', 'webpack-hot-middleware/client', 'webpack/hot/only-dev-server', entry],
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: 'bundle.js',
    path: output
  },
  resolve: {
    modules: ['public/app', 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.coffee', '.es6']
  },
  module: {
    rules: [{
      test: /\.s?css$/,
      use: ['style-loader', // creates style nodes from JS strings
      'css-loader', // translates CSS into CommonJS
      'sass-loader' // compiles Sass to CSS, using Node Sass by default
      ]
    }, {
      test: /\.js*$/,
      exclude: [/node_modules/],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'es2017', 'react', 'stage-0'],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel']
        }
      }
    }, {
      test: /\.(jpe?g|gif|png|svg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          limit: 10000
        }
      }]
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  plugins: [new _webpack.default.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }), new _webpack.default.HotModuleReplacementPlugin(), new _webpack.default.optimize.OccurrenceOrderPlugin(), new _webpack.default.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.js'
  }), new _momentLocalesWebpackPlugin.default()]
});

exports.default = _default;