// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require("webpack");

const paths = {
  DIST: path.resolve(__dirname, 'public'),
  SRC: path.resolve(__dirname, 'src'),
};

module.exports = {
  //lilo: app_root: paths.SRC, // the app root folder, needed by the other webpack configs
  entry: [
    // http://gaearon.github.io/react-hot-loader/getstarted/
    'webpack-dev-server/client?http://localhost:9090',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    paths.SRC + '/index.js',
  ],
  output: {
    path: paths.DIST + '/js',
    publicPath: 'js/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: paths.SRC,
        loaders: ['react-hot-loader', 'babel-loader'],
      },
      {
        // https://github.com/jtangelder/sass-loader
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      }
    ],
  },
  devServer: {
    contentBase: paths.DIST,
  },
  plugins: [
    new CleanWebpackPlugin(['css/main.css', 'js/bundle.js'], {
      root: paths.DIST,
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
