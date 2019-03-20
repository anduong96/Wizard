"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpack = _interopRequireDefault(require("webpack"));

var _extractTextWebpackPlugin = _interopRequireDefault(require("extract-text-webpack-plugin"));

var _momentLocalesWebpackPlugin = _interopRequireDefault(require("moment-locales-webpack-plugin"));

var _uglifyjsWebpackPlugin = _interopRequireDefault(require("uglifyjs-webpack-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = ({
  location,
  cssFileName
}) => ({
  devtool: '(none)',
  entry: {
    app: ['index.js'],
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: 'bundle.js',
    path: location
  },
  resolve: {
    modules: ['public/app', 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.coffee', '.es6']
  },
  module: {
    rules: [{
      test: /\.s?css$/,
      use: _extractTextWebpackPlugin.default.extract({
        fallback: "style-loader",
        // creates style nodes from JS strings
        use: [{
          loader: 'css-loader',
          // translates CSS into CommonJS
          options: {
            url: false,
            minimize: true,
            sourcemMap: false
          }
        }, {
          loader: 'sass-loader',
          // compiles Sass to CSS, using Node Sass by default
          options: {
            url: false,
            minimize: true,
            sourcemMap: false
          }
        }]
      })
    }, {
      test: /\.js*$/,
      exclude: [/node_modules/],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'es2017', 'react', 'stage-0']
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
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }), new _webpack.default.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.js'
  }), new _webpack.default.optimize.ModuleConcatenationPlugin(), new _uglifyjsWebpackPlugin.default({
    uglifyOptions: {
      comments: false,
      compress: {
        properties: true,
        warnings: false,
        drop_console: true
      },
      parallel: true
    }
  }), new _extractTextWebpackPlugin.default({
    filename: cssFileName,
    disable: false,
    allChunks: true
  }), new _momentLocalesWebpackPlugin.default()]
});

exports.default = _default;