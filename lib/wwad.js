'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const spawn = require('cross-spawn');
// import { fork } from 'child_process';
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server/lib/Server');

// const path = require('path');
var chalk = require('chalk');
var os = require('os');
var debug = require('debug');
var getWebpackConfig = require('./webpack');

function OS_check() {
  var nodeVersion = process.versions.node;
  var versions = nodeVersion.split('.');
  var major = versions[0];
  var minor = versions[1];
  var platform = os.platform();

  if (major * 10 + minor * 1 < 65) {
    debug(chalk.red('Node version (' + major + '.' + minor + ') is not compatibile, ' + chalk.cyan('must >= 6.5') + '.'), 'environment');
    debug(chalk.red('\u4F60\u7684 Node \u7248\u672C\u662F ' + chalk.yellow(major + '.' + minor) + '\uFF0C\u8BF7\u5347\u7EA7\u5230' + chalk.cyan(' 6.5 或以上') + '.', 'environment'));
    if (platform === 'darwin') {
      debug('\u63A8\u8350\u7528 ' + chalk.cyan('https://github.com/creationix/nvm') + ' \u7BA1\u7406\u548C\u5347\u7EA7\u4F60\u7684 node \u7248\u672C\u3002', 'environment');
    } else if (platform === 'win32') {
      debug('\u63A8\u8350\u5230 ' + chalk.cyan('https://nodejs.org/') + ' \u4E0B\u8F7D\u6700\u65B0\u7684 node \u7248\u672C\u3002', 'environment');
    }
    return false;
  }
  return true;
}

var Wwad = function () {
  function Wwad(options) {
    _classCallCheck(this, Wwad);

    this.options = options;
    var port = options.port,
        cwd = options.cwd;

    this.opt = {
      port: port,
      cwd: cwd,
      env: process.env.NODE_ENV
    };

    console.log(this.opt);

    process.env.CONTENT_BASE = this.projectPath;

    // const script = process.argv[2];
    // const args = process.argv.slice(3);

    // start 判断node版本和OS升级提示
    if (!OS_check()) {
      process.exit(1);
    }
    // End 判断node版本和OS升级提示


    // console.log('__dirname ===>', __dirname);
    // console.log('process.cwd() ===>', process.cwd());
    // console.log('require.resolve===>', require.resolve);
  }

  _createClass(Wwad, [{
    key: 'build',
    value: function build() {
      var compiler = webpack(getWebpackConfig(this.opt));
      compiler.run(function (err, stats) {
        console.log(err, stats);
      });
    }
  }, {
    key: 'start',
    value: function start() {
      // console.log(this.options);

      var webpackConfig = getWebpackConfig(this.opt);

      var DEFAULT_PORT = parseInt(this.opt.port, 10) || 8000;

      // 通过WebpackDevServer实例化的时候，不要将 dev server 选项放在 webpack 配置对象(webpack config object)中。而是，在创建选项时，将其作为第二个参数传递。
      // https://webpack.docschina.org/guides/hot-module-replacement#%E9%80%9A%E8%BF%87-node-js-api
      var WebpackDevServerOptions = {
        // contentBase: false,
        host: '0.0.0.0',
        // disableHostCheck: true,
        // contentBase: path.resolve(process.cwd(), 'public'),
        // publicPath: '/',
        port: DEFAULT_PORT,
        hot: true,
        compress: true,
        historyApiFallback: true,
        inline: true,
        progress: true
      };
      WebpackDevServer.addDevServerEntrypoints(webpackConfig, WebpackDevServerOptions);
      var server = new WebpackDevServer(webpack(webpackConfig), WebpackDevServerOptions);
      server.listen(WebpackDevServerOptions.port, WebpackDevServerOptions.host, function (err) {
        if (err) throw err;
      });
    }
  }]);

  return Wwad;
}();

module.exports = Wwad;