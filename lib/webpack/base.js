'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _copyWebpackPlugin = require('copy-webpack-plugin');

var _copyWebpackPlugin2 = _interopRequireDefault(_copyWebpackPlugin);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log(path.resolve(process.cwd(), './public/index.html'));
// console.log(path.resolve(process.cwd(), 'src/index.js'));
function getBaseConf(opt) {
  // console.log(opt.theme);
  // console.log(opt.html);

  var lessParam = [{
    loader: require.resolve('postcss-loader'),
    options: {
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
      cascade: true,
      add: false,
      remove: false,
      support: true,
      flexbox: true,
      grid: true,
      plugins: [_autoprefixer2.default]
    }
  }, {
    loader: require.resolve('less-loader'),
    options: {
      sourceMap: true,
      javascriptEnabled: true,
      modifyVars: _extends({}, opt.theme)
    }
  }];

  return {
    entry: [_path2.default.resolve(opt.cwd, 'src/index.js')],
    output: {
      path: _path2.default.resolve(opt.cwd, 'dist'),
      filename: 'index.[hash:8].js'
      // publicPath: '',
    },
    resolve: {
      // 引入模块的时候，可以不用扩展名
      extensions: ['.js', '.less', '.css', '.json']
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [{
        test: /\.js$/,
        include: _path2.default.join(opt.cwd, 'src'),
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            presets: [[require.resolve('babel-preset-env'), {
              include: [],
              useBuiltIns: true,
              targets: {
                browsers: [
                // '> 1%',
                'last 2 versions']
              }
            }], require.resolve('babel-preset-react'), require.resolve('babel-preset-stage-0')],
            env: {
              development: {
                plugins: [[require.resolve('babel-plugin-react-transform'), {
                  transforms: [{
                    transform: require.resolve('react-transform-catch-errors'),
                    imports: [_path2.default.join(opt.cwd, 'node_modules/react'), _path2.default.join(opt.cwd, 'node_modules/redbox-react')]
                  }]
                }], require.resolve('babel-plugin-dva-hmr')]
              }
            },
            plugins: [require.resolve('babel-plugin-transform-runtime'), require.resolve('babel-plugin-add-module-exports'), require.resolve('babel-plugin-react-require'), require.resolve('babel-plugin-transform-decorators-legacy'), require.resolve('babel-plugin-syntax-dynamic-import'), require.resolve('babel-plugin-transform-object-rest-spread'), // 对象添加spread操作符
            [require.resolve('babel-plugin-import'), { libraryName: 'antd', style: true }]]
          }
        }
      }, {
        test: /\.css$/,
        include: _path2.default.join(opt.cwd, 'src'),
        use: [require.resolve('style-loader'), {
          loader: require.resolve('css-loader'),
          options: {
            minimize: true,
            modules: opt.ableCSSModules,
            localIdentName: '[path][name]__[local]--[hash:base64:5]'
          }
        }, {
          loader: require.resolve('postcss-loader'),
          options: {
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
            cascade: true,
            add: false,
            remove: false,
            support: true,
            flexbox: true,
            grid: true,
            plugins: [_autoprefixer2.default]
          }
        }]
      }, {
        test: /\.less$/,
        include: _path2.default.join(opt.cwd, 'src'),
        use: [require.resolve('style-loader'), {
          loader: require.resolve('css-loader'),
          options: {
            minimize: true,
            modules: opt.ableCSSModules,
            localIdentName: '[path][name]__[local]--[hash:base64:5]'
          }
        }].concat(lessParam)
      },
      // node_modules less
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [require.resolve('style-loader'), {
          loader: require.resolve('css-loader'),
          options: {
            minimize: true
          }
        }].concat(lessParam)
      }, {
        test: /\.(html|htm)/,
        use: require.resolve('html-loader')
      }, {
        test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)/,
        include: _path2.default.join(opt.cwd, 'src'),
        use: {
          loader: require.resolve('url-loader'),
          options: {
            limit: 5 * 1024,
            outputPath: '',
            name: 'static/[name].[hash:8].[ext]'
          }
        }
      }]
    },
    plugins: [new _copyWebpackPlugin2.default([{
      from: _path2.default.resolve(opt.cwd, './public'), // 静态资源目录源地址
      ignore: ['index.html'],
      to: '' // 目标地址，相对于output的path目录
    }]), new _htmlWebpackPlugin2.default(opt.html)]
  };
}

module.exports = getBaseConf;