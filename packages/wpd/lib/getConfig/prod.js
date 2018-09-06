'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (webpackConfig, opts) {
  var disableCompress = process.env.COMPRESS === 'none';

  webpackConfig.mode('production').bail(true).devtool(opts.devtool);

  if (disableCompress && !process.env.__FROM_UMI_TEST) {
    webpackConfig.output.pathinfo(true);
    webpackConfig.optimization.namedModules(true).namedChunks(true);
  }

  if (opts.hash) {
    webpackConfig.output.filename('[name].[chunkhash:8].js').chunkFilename('[name].[chunkhash:8].async.js');
  }

  webpackConfig.performance.hints(false);

  if (opts.manifest) {
    webpackConfig.plugin('manifest').use(require('webpack-manifest-plugin'), [_extends({
      fileName: 'asset-manifest.json'
    }, opts.manifest)]);
  }

  webpackConfig.optimization
  // don't emit files if have error
  .noEmitOnErrors(true);

  if (disableCompress || process.env.__FROM_UMI_TEST) {
    webpackConfig.optimization.minimize(false);
  } else {
    webpackConfig.plugin('hash-module-ids').use(require('webpack/lib/HashedModuleIdsPlugin'));

    webpackConfig.optimization.minimizer([new _uglifyjsWebpackPlugin2.default(mergeConfig(_extends({}, _uglifyOptions2.default, {
      sourceMap: !!opts.devtool
    }), opts.uglifyJSOptions))]);
  }
};

var _uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

var _uglifyjsWebpackPlugin2 = _interopRequireDefault(_uglifyjsWebpackPlugin);

var _isPlainObject = require('is-plain-object');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _uglifyOptions = require('./uglifyOptions');

var _uglifyOptions2 = _interopRequireDefault(_uglifyOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mergeConfig(config, userConfig) {
  if (typeof userConfig === 'function') {
    return userConfig(config);
  }
  if ((0, _isPlainObject2.default)(userConfig)) {
    return _extends({}, config, userConfig);
  }
  return config;
}