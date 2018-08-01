'use strict';

var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

function getProdConf(opt) {
  return {
    mode: 'production',
    devtool: 'none',
    plugins: [new CleanWebpackPlugin(['dist'], {
      root: path.resolve(opt.cwd)
    }), new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      parallel: true
    }), new webpack.HashedModuleIdsPlugin(), new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })]
  };
}

module.exports = getProdConf;