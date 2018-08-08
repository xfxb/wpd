'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dev;

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HOST = process.env.HOST || '0.0.0.0';

// process.env.NODE_ENV = 'development';

function dev(_ref) {
  var webpackConfig = _ref.webpackConfig,
      port = _ref.port;

  // compiler 对象上挂载了相应的 webpack 事件钩子
  var compiler = (0, _webpack2.default)(webpackConfig);
  console.log(webpackConfig);

  var serverConfig = {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    hot: true,
    quiet: true,
    headers: {
      'access-control-allow-origin': '*'
    },
    // publicPath: webpackConfig.output.publicPath,
    watchOptions: {
      ignored: /node_modules/
    },
    historyApiFallback: false,
    overlay: false,
    host: HOST
  };

  var server = new _webpackDevServer2.default(compiler, serverConfig);

  server.listen(port || 8000, HOST, function (err) {
    if (err) {
      console.error(err);
    }
  });
}