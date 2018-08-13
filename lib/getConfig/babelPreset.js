'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  var plugins = [
  // adds React import declaration if file contains JSX tags
  require.resolve('babel-plugin-transform-runtime'), require.resolve('babel-plugin-add-module-exports'), require.resolve('babel-plugin-react-require'), require.resolve('babel-plugin-transform-decorators-legacy'), require.resolve('babel-plugin-syntax-dynamic-import'), require.resolve('babel-plugin-transform-object-rest-spread'), // 对象添加spread操作符
  ['import', { libraryName: 'antd', style: true }]];

  if (env === 'development') {
    plugins.push([require.resolve('babel-plugin-react-transform'), {
      transforms: [{
        transform: require.resolve('react-transform-catch-errors'),
        imports: [(0, _path.join)(opts.cwd, 'node_modules/react'), (0, _path.join)(opts.cwd, 'node_modules/redbox-react')]
      }]
    }]);
    plugins.push(require.resolve('babel-plugin-dva-hmr'));
  }

  var browsers = opts.browsers || ['last 2 versions'];
  return {
    presets: [[require.resolve('babel-preset-env'), {
      include: [],
      useBuiltIns: true,
      targets: {
        browsers: browsers
      }
    }], require.resolve('babel-preset-react'), require.resolve('babel-preset-stage-0')],
    plugins: plugins
  };
};

var _path = require('path');

var env = process.env.NODE_ENV;