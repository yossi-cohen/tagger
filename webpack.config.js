// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
var app_root = 'src'; // the app root folder
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require("webpack");

module.exports = {
  //lilo: app_root: app_root, // the app root folder, needed by the other webpack configs
  entry: [
    // http://gaearon.github.io/react-hot-loader/getstarted/
    'webpack-dev-server/client?http://localhost:9090',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    __dirname + '/' + app_root + '/index.js',
  ],
  output: {
    path: __dirname + '/public/js',
    publicPath: 'js/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader'],
      },
      {
        // https://github.com/jtangelder/sass-loader
        test: /\.scss$/,
        loaders: ['style-loader', 'css', 'sass'],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css'],
      }
    ],
  },
  devServer: {
    contentBase: __dirname + '/public',
  },
  plugins: [
    new CleanWebpackPlugin(['css/main.css', 'js/bundle.js'], {
      root: __dirname + '/public',
      verbose: true,
      dry: false, // true for simulation
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      }
    })
  ],
};
