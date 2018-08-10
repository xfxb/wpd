'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = build;

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function build() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var webpackConfig = opts.webpackConfig;

  // 清理删除目录

  _rimraf2.default.sync(webpackConfig.output.path);

  (0, _webpack2.default)(webpackConfig, function (err, stats) {
    if (err) {
      console.error(err, stats);
    }
  });
}