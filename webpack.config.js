var webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: ["./client/js/index.js", "bootstrap-loader/extractStyles", "./client/js/index.css.js"],
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["babel-preset-env"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader?limit=1024&name=/fonts/[name].[ext]"
            },
            {
                test: /\.(jpg|jpeg|gif|png)$/,
                exclude: /node_modules/,
                loader: "url-loader?limit=1024&name=/images/[name].[ext]"
            }
        ]
    },
    output: {
        filename: "./build/bundle.js",
        path: __dirname + "/client"
    },
    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery"
        }),
        new ExtractTextPlugin("./build/bundle.css")
    ]
};