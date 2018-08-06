'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

var _uglifyjsWebpackPlugin2 = _interopRequireDefault(_uglifyjsWebpackPlugin);

var _cleanWebpackPlugin = require('clean-webpack-plugin');

var _cleanWebpackPlugin2 = _interopRequireDefault(_cleanWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProdConf(opt) {
  return {
    mode: 'production',
    devtool: 'hidden-source-map',
    plugins: [new _cleanWebpackPlugin2.default(['dist'], {
      root: _path2.default.resolve(opt.cwd)
    }), new _uglifyjsWebpackPlugin2.default({
      uglifyOptions: {
        compress: {
          warnings: false, // 删除无用代码时不输出警告
          drop_console: false, // 删除所有console语句，可以兼容IE
          collapse_vars: true, // 内嵌已定义但只使用一次的变量
          reduce_vars: true // 提取使用多次但没定义的静态值到变量
        },
        output: {
          beautify: false, // 最紧凑的输出，不保留空格和制表符
          comments: false // 删除所有注释
        }
      },
      parallel: true
    }), new _webpack2.default.HashedModuleIdsPlugin(), new _webpack2.default.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })]
  };
}

module.exports = getProdConf;