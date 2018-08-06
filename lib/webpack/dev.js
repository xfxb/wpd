'use strict';

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDevConf() {
  return {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    // devtool: 'cheap-source-map',
    watch: true, // 只有在开启监听模式时，watchOptions才有意义
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300, // 监听到变化发生后等300ms再去执行动作，防止文件更新太快导致编译频率太高
      poll: 1000 // 通过不停的询问文件是否改变来判断文件是否发生变化，默认每秒询问1000次
    },
    plugins: [
    // 定义环境变量
    new _webpack2.default.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }), new _webpack2.default.HotModuleReplacementPlugin(), // 热替换插件
    new _webpack2.default.NamedModulesPlugin()]
  };
}

module.exports = getDevConf;