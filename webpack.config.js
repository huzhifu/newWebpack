var path = require("path");
var webpack = require("webpack")
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');//压缩混淆js
var ExtractTextPlugin = require("extract-text-webpack-plugin");//将css独立引入变成link标签形式

var HtmlwebpackPlugin = require('html-webpack-plugin');//配置html的一些信息
var OpenBrowserPlugin = require('open-browser-webpack-plugin');//主动打开浏览器窗口  --暂时不用
module.exports = {
  entry: {app:'./src/js/index.js'},
  output: {
    path: path.resolve(__dirname,"dist"),
    publicPath:"/",
    filename: 'bundle.js'
  },
  module: {
    rules:[
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({  //将css独立引入变成link标签形式
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
　　　　　test: /\.html$/,
　　　　　loader: 'html-withimg-loader'  //将html中的引用图片打包处理
　　　},
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:"img/[name].[ext]" //将css中的引用图片打包处理
            }
          },
         
        ]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({ //将less转为css后，引入变成link标签形式
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
    new UglifyJsPlugin(),//压缩混淆js代码
    new HtmlwebpackPlugin({
      title: '首页',
      filename: 'index.html',
      template:'./index.html',
      filename:'./index.html',
      inject: true,
      hash:true,
    }),
    // new OpenBrowserPlugin({
    //   url: 'http://localhost:8088'
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: 'vendor.js'
    // }),
    new ExtractTextPlugin({
      filename: 'css/[name].css', 
      allChunks: true
    })
  ]
};
