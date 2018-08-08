'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warnIfExists = warnIfExists;
exports.applyWebpackConfig = applyWebpackConfig;

var _fs = require('fs');

var _path = require('path');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function warnIfExists(cwd) {
  var filePath = (0, _path.join)(cwd, 'webpack.config.js');
  if ((0, _fs.existsSync)(filePath)) {
    console.log(_chalk2.default.yellow('\u26A0\uFE0F \u26A0\uFE0F \u26A0\uFE0F  It\\\'s not recommended to use ' + _chalk2.default.bold('webpack.config.js') + ', since it\\\'s major or minor version upgrades may result in incompatibility. If you insist on doing so, please be careful of the compatibility after upgrading.'));
    console.log();
  }
}

function applyWebpackConfig(cwd, config) {
  var filePath = (0, _path.join)(cwd, 'webpack.config.js');
  if ((0, _fs.existsSync)(filePath)) {
    var customConfigFn = require(filePath); // eslint-disable-line
    if (customConfigFn.default) {
      customConfigFn = customConfigFn.default;
    }
    return customConfigFn(config, {
      // eslint-disable-line
      webpack: _webpack2.default
    });
  }
  return config;
}