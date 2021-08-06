const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const buildFolderName = "public";

module.exports = {
    mode: "development",
    entry: ["./src/js/index.js", "./src/css/index.css", "./src/index.html", "./src/favicon.svg"],
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(jpg|jpeg|gif|png|ico|svg)$/,
                loader: "file-loader",
                options: {
                    limit: 1024,
                    name: "[name].[ext]"
                }
            },
            {
                test: /\.(html)$/,
                loader: "file-loader",
                options: {
                    limit: 1024,
                    name: "[name].[ext]"
                }
            }
        ]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, buildFolderName),
        publicPath: "/"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ],
    devServer: {
        index: path.resolve(__dirname, buildFolderName,"index.html"),
        contentBase: path.resolve(__dirname, buildFolderName),
        publicPath: "/",
        port: 8080,
        watchContentBase: false,
        open: false,
        inline: true
    }
};