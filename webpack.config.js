var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var projectRoot = process.env.PWD; // Absolute path to the project root
var resolveRoot = path.join(projectRoot, 'node_modules'); // project root/node_modules
var publicPath = './public';

var extractCSS = new ExtractTextPlugin('app.css');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('vendors', 'vendor.js');
var env = new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')});
var plugins = [commonsPlugin, extractCSS];

if(process.env.NODE_ENV == 'production'){
  plugins.push(new webpack.optimize.OccurenceOrderPlugin());
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: { warnings: false }
  }));
  plugins.push(env);
}

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'client/main.js'),
    vendors: ['react', 'react-dom', 'react-redux', 'react-router', 'redux-thunk', 'lodash', 'classnames', 'react-router-scroll',
      'redux', 'autobind-decorator', 'react-router-redux', 'react-helmet', 'bluebird', 'firebase' ]
  },
  //devtool: 'source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: publicPath,
    publicPath: '/scripts/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [resolveRoot],
        loader: 'babel-loader',
        query: {
          presets: ['es2015', "stage-1", 'react'],
          plugins: ["transform-decorators-legacy"]
        }
      },
      {
        test: /\.scss$/,
        loader: extractCSS.extract('style', ['css', 'postcss', 'sass'])
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./bower_components/bootstrap-sass/assets/stylesheets"), path.resolve(__dirname, "./scss")]
  },
  postcss() {
    return [autoprefixer];
  },
  resolve: {
    root: [
      resolveRoot,
      path.join(__dirname, 'node_modules')
    ],
    extensions: ['', '.js', '.json']
  },
  plugins: plugins,
  modulesDirectories: [
    'node_modules'
  ]
};