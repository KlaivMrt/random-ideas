const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        index: path.resolve(__dirname, "src/components/Home.js"),
    },
    output: {
        path: path.resolve(__dirname, "../public"),
        filename: "scripts/[name].js"
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "../public")
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
        proxy:{
            "/api": "http://localhost:5000"
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /[\.(jpg|png)]$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "img/",
                            publicPath: "img/"
                        }
                    }
                ],
                
            }
        ]
    },
    plugins: [].concat(
        ["index"].map((file) => 
        new htmlWebpackPlugin({
            inject: true,
            filename: `${file}.html`,
            template: `./src/${file}.html`,
            chunks: [file]
        }))
    )
}