const path = require("path")
const webpack = require("webpack")

module.exports = {
    entry: "./app/app.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "app"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: "babel-loader",
                options: {
                    presets: ["react", "es2015"]
                }
            },
            {
                test: /\.css/,
                loader: "style-loader!css-loader"
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
}