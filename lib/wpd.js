'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var webpack = require('webpack');
// const fs = require('fs');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server/lib/Server');

// const path = require('path');
var chalk = require('chalk');
var os = require('os');
var debug = require('debug');
var getWebpackConfig = require('./webpack');

var _require = require('./utils'),
    isFsExistsSync = _require.isFsExistsSync;

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

var Wpd = function () {
  function Wpd(options) {
    _classCallCheck(this, Wpd);

    // 判断node版本和OS升级提示
    if (!OS_check()) {
      process.exit(1);
    }
    var defaultOpt = {
      ableCSSModules: true,
      theme: null,
      define: null,
      html: {
        template: './public/index.html',
        filename: 'index.html'
      }
    };
    var port = options.port,
        cwd = options.cwd;


    var configJsObj = null; // 配置文件对象
    var configJs_mergeObj = null; // 合并后的配置文件对象

    var configjs = path.resolve(cwd || process.cwd(), './Wpd.config.js');
    var thisCwd = cwd || process.cwd();

    if (isFsExistsSync(configjs)) {
      configJsObj = require(configjs); // eslint-disable-line
      configJs_mergeObj = Object.assign(defaultOpt, configJsObj);
      // console.log(configJsObj);

      var cmhObj = configJs_mergeObj && configJs_mergeObj.html || undefined;
      this.opt = {
        ableCSSModules: configJs_mergeObj.ableCSSModules,
        theme: configJs_mergeObj.theme,
        define: configJs_mergeObj.define,
        html: {
          template: cmhObj && cmhObj.template ? path.resolve(thisCwd, cmhObj.template) : path.resolve(thisCwd, './public/index.html'),
          filename: cmhObj && cmhObj.html || 'index.html'
        }
      };
    } else {
      console.log('没有找到配置文件');
      this.opt = _extends({}, defaultOpt, {
        html: {
          template: path.resolve(thisCwd, './public/index.html'),
          filename: 'index.html'
        }
      });
    }

    this.opt.port = parseInt(port, 10) || 8000;
    this.opt.cwd = thisCwd;

    // console.log('__dirname ===>', __dirname);
    // console.log('process.cwd() ===>', process.cwd());
    // console.log('require.resolve===>', require.resolve);


    console.log(this.opt);
  }

  _createClass(Wpd, [{
    key: 'build',
    value: function build() {
      var compiler = webpack(getWebpackConfig(this.opt, 'build'));
      compiler.run(function (err) {
        if (err) {
          throw err;
        }
        // console.log(err, stats);
      });
    }
  }, {
    key: 'start',
    value: function start() {
      // console.log(this.options);

      var webpackConfig = getWebpackConfig(this.opt, 'start');

      // console.log(typeof this.opt.port);


      // 通过WebpackDevServer实例化的时候，不要将 dev server 选项放在 webpack 配置对象(webpack config object)中。而是，在创建选项时，将其作为第二个参数传递。
      // https://webpack.docschina.org/guides/hot-module-replacement#%E9%80%9A%E8%BF%87-node-js-api
      var WebpackDevServerOptions = {
        // contentBase: false,
        host: '0.0.0.0',
        // disableHostCheck: true,
        // contentBase: path.resolve(process.cwd(), 'public'),
        // publicPath: '/',
        port: this.opt.port,
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

  return Wpd;
}();

module.exports = Wpd;