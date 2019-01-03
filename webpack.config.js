var webpack = require('webpack')

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: "./src/client/client.js",
  output: {
    path: path.join(__dirname, 'public/build'),
    publicPath: "build/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ["es2015", "stage-0", 'react']
        },
        exclude: [/node_modules/, /public/]
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        options: {
          presets: ["es2015", "stage-0", 'react']
        },
        exclude: [/node_modules/, /public/]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
      },
      { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
      { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
      { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
      { test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=image/svg+xml' },
      { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' }
    ]
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : null,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
}
