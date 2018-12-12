var path = require("path");
var webpack = require("webpack")
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");//将css独立引入变成link标签形式

var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
  entry: {app:'./js/main.js',vendor: ['jquery']},
  output: {
    path: path.resolve(__dirname,"dist"),
    // publicPath:"./assets",
    filename: 'bundle.js'
  },
  externals:{
    'jquery':'window.jQuery',//全局引入jq
    'layui':'layui',//全局引入layui
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
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
              limit: 8192,
              name:"[name]-[hash:5].[ext]"
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            //resolve-url-loader may be chained before sass-loader if necessary
            use: ['css-loader', 'less-loader']
        })
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "./"),
    compress: true,
    port: 8088
    // host:"localhost",
    // inline: true,
  },
  plugins: [
    new UglifyJsPlugin(),//压缩代码
    new HtmlwebpackPlugin({
      title: '首页',
      filename: 'index.html'
    }),
    // new OpenBrowserPlugin({
    //   url: 'http://localhost:8088'
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css', 
      allChunks: true
    })
  ]
};
