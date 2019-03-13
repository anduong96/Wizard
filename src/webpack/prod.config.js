import Webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import MomentLocalesPlugin from 'moment-locales-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

export default ({
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
        path: location,
    },

    resolve: {
        modules: ['public/app', 'node_modules'],
        extensions: ['.js', '.jsx', '.json', '.coffee', '.es6']
    },

    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", // creates style nodes from JS strings
                    use: [
                        {
                            loader: 'css-loader', // translates CSS into CommonJS
                            options: {
                                url: false,
                                minimize: true,
                                sourcemMap: false
                            }
                        },
                        {
                            loader: 'sass-loader', // compiles Sass to CSS, using Node Sass by default
                            options: {
                                url: false,
                                minimize: true,
                                sourcemMap: false
                            }
                        }
                    ]
                })
            },
            {
                test: /\.js*$/,
                exclude: [ /node_modules/ ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'es2017', 'react', 'stage-0']
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
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },

    plugins: [
        new Webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production') }),
        new Webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: Infinity, filename: 'vendor.js' }),
        new Webpack.optimize.ModuleConcatenationPlugin(),
        new UglifyJsPlugin({ uglifyOptions: { comments: false, compress: { properties: true, warnings: false, drop_console: true }, parallel: true } }),
        new ExtractTextPlugin({ filename: cssFileName, disable: false, allChunks: true }),
        new MomentLocalesPlugin(), //Unecessary to include other locale except for english. Remove if necessary
    ]
})
