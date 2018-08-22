'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dev;

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _Server = require('webpack-dev-server/lib/Server');

var _Server2 = _interopRequireDefault(_Server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log(333333333,'------------');

var HOST = process.env.HOST || '0.0.0.0';
// import WebpackDevServer from 'webpack-dev-server';

var PORT = process.env.PORT || 8000;

// process.env.NODE_ENV = 'development';

function dev(_ref) {
  var webpackConfig = _ref.webpackConfig;

  // compiler 对象上挂载了相应的 webpack 事件钩子
  // const compiler = webpack(webpackConfig);
  // console.log(webpackConfig);

  var WebpackDevServerOptions = {
    // disableHostCheck: true,
    // compress: true,
    // clientLogLevel: 'none',
    // hot: true,
    // quiet: true,
    // // publicPath: webpackConfig.output.publicPath,
    // watchOptions: {
    //   ignored: /node_modules/,
    // },
    // historyApiFallback: false,
    // overlay: false,
    // host: HOST,

    // contentBase: false,
    // disableHostCheck: true,
    // contentBase: path.resolve(process.cwd(), 'public'),
    // publicPath: '/',
    headers: {
      'access-control-allow-origin': '*'
    },
    host: HOST,
    port: PORT,
    hot: true,
    compress: true,
    historyApiFallback: true,
    inline: true,
    progress: true
  };
  _Server2.default.addDevServerEntrypoints(webpackConfig, WebpackDevServerOptions);
  var server = new _Server2.default((0, _webpack2.default)(webpackConfig), WebpackDevServerOptions);

  // const server = new WebpackDevServer(compiler, serverConfig);

  server.listen(PORT, HOST, function (err) {
    if (err) {
      console.error(err);
    }
  });
}