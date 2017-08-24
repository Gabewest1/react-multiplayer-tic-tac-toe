const path = require("path")
const webpack = require("webpack")

module.exports = {
    devtool: "source-map",
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        "./app/app.js"
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "app"),
        publicPath: "/",
        sourceMapFilename: "bundle.js.map",
        devtoolLineToLine: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: "babel-loader",
                options: {
                    presets: ["react", "es2015"],
                }
            },
            {
                test: /\.css/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    {
                        loader: "image-webpack-loader",
                        query: {
                            bypassOnDebug: true,
                            gifsicle: {
                                interlaced: true
                            },
                            optipng: {
                                optimizationLevel: 7
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "app")
        ]
    },
    watch: true
}