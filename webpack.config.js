var path = require("path");
var webpack = require("webpack")
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
  entry: {app:'./js/main.js',vendor: ['jquery']},
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "./"),
    compress: true,
    port: 8080
    // host:"localhost",
    // inline: true,
  },
  plugins: [
    new UglifyJsPlugin(),
    new HtmlwebpackPlugin({
      title: 'xiaoyuan',
      filename: 'index.html'
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    })
  ]
};
