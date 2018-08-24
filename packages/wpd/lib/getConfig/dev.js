'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (webpackConfig, opts) {
  webpackConfig.devtool(opts.devtool || 'cheap-module-eval-source-map').output.pathinfo(true);

  webpackConfig.watch(true); // 只有在开启监听模式时，watchOptions才有意义

  webpackConfig.watchOptions({
    ignored: /node_modules/,
    aggregateTimeout: 300, // 监听到变化发生后等300ms再去执行动作，防止文件更新太快导致编译频率太高
    poll: 1000 // 通过不停的询问文件是否改变来判断文件是否发生变化，默认每秒询问1000次
  });

  // webpackConfig
  //   .plugin('system-bell')
  //   .use(require('system-bell-webpack-plugin'));

  webpackConfig.plugin('HotModuleReplacementPlugin') // 热替换插件
  .use(_webpack2.default.HotModuleReplacementPlugin);

  webpackConfig.plugin('NamedModulesPlugin') // 执行热替换时打印模块名字
  .use(_webpack2.default.NamedModulesPlugin);

  // if (process.env.HARD_SOURCE) {
  //   webpackConfig
  //     .plugin('hard-source')
  //     .use(require('hard-source-webpack-plugin'));
  // }
};

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }