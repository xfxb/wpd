'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Server = require('webpack-dev-server/lib/Server');

var _Server2 = _interopRequireDefault(_Server);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _utils = require('./utils');

var _webpack3 = require('./webpack');

var _webpack4 = _interopRequireDefault(_webpack3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var debug = require('debug')('wpd');

// const fs = require('fs');

// const path = require('path');


function OS_check() {
  var nodeVersion = process.versions.node;
  var versions = nodeVersion.split('.');
  var major = versions[0];
  var minor = versions[1];
  var platform = _os2.default.platform();

  if (major * 10 + minor * 1 < 80) {
    debug(_chalk2.default.red('Node version (' + major + '.' + minor + ') is not compatibile, ' + _chalk2.default.cyan('must >= 8.0') + '.'), 'environment');
    debug(_chalk2.default.red('\u4F60\u7684 Node \u7248\u672C\u662F ' + _chalk2.default.yellow(major + '.' + minor) + '\uFF0C\u8BF7\u5347\u7EA7\u5230' + _chalk2.default.cyan(' 8.0 或以上') + '.', 'environment'));
    if (platform === 'darwin') {
      debug('\u63A8\u8350\u7528 ' + _chalk2.default.cyan('https://github.com/creationix/nvm') + ' \u7BA1\u7406\u548C\u5347\u7EA7\u4F60\u7684 node \u7248\u672C\u3002', 'environment');
    } else if (platform === 'win32') {
      debug('\u63A8\u8350\u5230 ' + _chalk2.default.cyan('https://nodejs.org/') + ' \u4E0B\u8F7D\u6700\u65B0\u7684 node \u7248\u672C\u3002', 'environment');
    }
    return false;
  }
  return true;
}

var Wpd = function () {
  function Wpd(options) {
    _classCallCheck(this, Wpd);

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

    var thisCwd = cwd || process.cwd();

    var configJsObj = null; // 配置文件对象
    var configJs_mergeObj = null; // 合并后的配置文件对象

    var configjs = _path2.default.resolve(thisCwd, './wpd.config.js');

    // 判断node版本和OS升级提示
    if (!OS_check()) {
      process.exit(1);
    }

    // 判断redbox-react是否已经安装
    if (!(0, _utils.isFsExistsSync)(_path2.default.resolve(thisCwd, 'node_modules/redbox-react/package.json'))) {
      console.error(_chalk2.default.red('还没有安装 redbox-react') + ' \u8BF7\u8FD0\u884C ' + _chalk2.default.cyan('npm i redbox-react -D') + ' \u8FDB\u884C\u5B89\u88C5');
      process.exit(1);
    }

    if ((0, _utils.isFsExistsSync)(configjs)) {
      configJsObj = require(configjs); // eslint-disable-line
      configJs_mergeObj = Object.assign(defaultOpt, configJsObj);

      var cmhObj = configJs_mergeObj && configJs_mergeObj.html || undefined;
      this.opt = {
        ableCSSModules: configJs_mergeObj.ableCSSModules,
        theme: configJs_mergeObj.theme,
        define: configJs_mergeObj.define,
        html: {
          template: cmhObj && cmhObj.template ? _path2.default.resolve(thisCwd, cmhObj.template) : _path2.default.resolve(thisCwd, './public/index.html'),
          filename: cmhObj && cmhObj.filename || 'index.html'
        }
      };
    } else {
      console.log(_chalk2.default.red('没有找到配置文件'), 'environment');
      this.opt = _extends({}, defaultOpt, {
        html: {
          template: _path2.default.resolve(thisCwd, './public/index.html'),
          filename: 'index.html'
        }
      });
    }

    this.opt.port = parseInt(port, 10) || 8000;
    this.opt.cwd = thisCwd;

    // console.log('__dirname ===>', __dirname);
    // console.log('process.cwd() ===>', process.cwd());
    // console.log('require.resolve===>', require.resolve);


    console.log(_chalk2.default.cyan('============= 当前配置 ============= '));
    console.log(_chalk2.default.cyan(JSON.stringify(this.opt, null, 4)));
  }

  _createClass(Wpd, [{
    key: 'build',
    value: function build() {
      process.env.NODE_ENV = 'production';
      var compiler = (0, _webpack2.default)((0, _webpack4.default)(this.opt, 'build'));
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
      process.env.NODE_ENV = 'development';

      var webpackConfig = (0, _webpack4.default)(this.opt, 'start');

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
      _Server2.default.addDevServerEntrypoints(webpackConfig, WebpackDevServerOptions);
      var server = new _Server2.default((0, _webpack2.default)(webpackConfig), WebpackDevServerOptions);
      server.listen(WebpackDevServerOptions.port, WebpackDevServerOptions.host, function (err) {
        if (err) throw err;
      });
    }
  }]);

  return Wpd;
}();

module.exports = Wpd;

// entry
// theme
// define
// externals
// alias
// extraResolveExtensions
// browserslist
// publicPath
// outputPath
// devtool
// commons
// hash
// html
// disableCSSModules
// disableCSSSourceMap
// extraBabelPresets
// extraBabelPlugins
// extraBabelIncludes
// copy
// proxy
// sass
// manifest
// ignoreMomentLocale
// disableDynamicImport
// env