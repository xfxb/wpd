'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// console.log(path.resolve(process.cwd(), './public/index.html'));
// console.log(path.resolve(process.cwd(), 'src/index.js'));
function getBaseConf(opt) {
  // console.log(opt.theme);
  // console.log(opt.html);
  return {
    entry: ['babel-polyfill', path.resolve(opt.cwd, 'src/index.js')],
    output: {
      path: path.resolve(opt.cwd, 'dist'),
      filename: 'index.[hash:8].js'
      // publicPath: '',
    },
    resolve: {
      // 引入模块的时候，可以不用扩展名
      extensions: ['.js', '.less', '.json', '.css']
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
      rules: [{
        test: /\.js$/,
        include: path.join(opt.cwd, 'src'),
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            presets: [require.resolve('babel-preset-env'), require.resolve('babel-preset-react'), require.resolve('babel-preset-stage-0')],
            plugins: [require.resolve('babel-plugin-react-require'), require.resolve('babel-plugin-transform-decorators-legacy'), require.resolve('babel-plugin-add-module-exports'), require.resolve('babel-plugin-syntax-dynamic-import'), require.resolve('babel-plugin-dva-hmr'), ['import', { libraryName: 'antd', style: true }]]
          }
        }
      }, {
        test: /\.css$/,
        use: [require.resolve('style-loader'), {
          loader: require.resolve('css-loader'),
          options: {
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
            plugins: [autoprefixer]
          }
        }]
      }, {
        test: /\.less$/,
        include: path.join(opt.cwd, 'src'),
        exclude: /node_modules/,
        use: [require.resolve('style-loader'), {
          loader: require.resolve('css-loader'),
          options: {
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
            plugins: [autoprefixer]
          }
        }, {
          loader: require.resolve('less-loader'),
          options: {
            sourceMap: true,
            javascriptEnabled: true,
            modifyVars: _extends({}, opt.theme)
          }
        }]
      },
      // node_modules less
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [require.resolve('style-loader'), {
          loader: require.resolve('css-loader')
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
            plugins: [autoprefixer]
          }
        }, {
          loader: require.resolve('less-loader'),
          options: {
            sourceMap: true,
            javascriptEnabled: true,
            modifyVars: _extends({}, opt.theme)
          }
        }]
      }, {
        test: /\.(html|htm)/,
        use: require.resolve('html-loader')
      }, {
        test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)/,
        use: {
          loader: require.resolve('url-loader'),
          options: {
            limit: 5 * 1024,
            outputPath: '',
            name: 'images/[name].[hash:8].[ext]'
          }
        }
      }]
    },
    plugins: [new CopyWebpackPlugin([{
      from: path.resolve(opt.cwd, './public'), // 静态资源目录源地址
      ignore: ['index.html'],
      to: '' // 目标地址，相对于output的path目录
    }]), new HtmlWebpackPlugin(opt.html)]
  };
}

module.exports = getBaseConf;