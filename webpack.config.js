const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  module:{
    rules:[
        {
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            use:{
                loader:'babel-loader',
                options: {
                    presets:[
                        '@babel/preset-env',
                        ['@babel/preset-react',{'runtime': 'automatic'}]
                    ]
                }
            }
        },
        {
            test: /\.css$/,
            use:[MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
            type: "asset",
        },
    ],
},
plugins: [
    new HtmlWebpackPlugin({
       template: './public/index.html',
       filename: 'panel.html',
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
        patterns: [{ from: "public", }]
    })
  ],
};