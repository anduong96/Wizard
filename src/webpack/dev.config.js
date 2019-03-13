import Webpack from 'webpack'
import MomentLocalesPlugin from 'moment-locales-webpack-plugin'

export default ({
    location
}) => ({

    devtool: 'cheap-module-eval-source-map',

    entry: {
        app: [
            'eventsource-polyfill',
            'webpack-hot-middleware/client',
            'webpack/hot/only-dev-server',
            'index.js'
        ],
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
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.js*$/,
                exclude: [ /node_modules/ ],
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
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },

    plugins: [
        new Webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') }),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.optimize.OccurrenceOrderPlugin(),
        new Webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity, filename: 'vendor.js' }),
        new MomentLocalesPlugin()
    ]
})
