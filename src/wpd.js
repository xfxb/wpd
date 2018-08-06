
import webpack from 'webpack';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server/lib/Server';
import chalk from 'chalk';
import os from 'os';
import { isFsExistsSync } from './utils';
import getWebpackConfig from './webpack';


const debug = require('debug')('wpd');

// const fs = require('fs');

// const path = require('path');


function OS_check() {
  const nodeVersion = process.versions.node;
  const versions = nodeVersion.split('.');
  const major = versions[0];
  const minor = versions[1];
  const platform = os.platform();

  if (((major * 10) + (minor * 1)) < 80) {
    debug(chalk.red(`Node version (${major}.${minor}) is not compatibile, ${chalk.cyan('must >= 8.0')}.`), 'environment');
    debug(chalk.red(`你的 Node 版本是 ${chalk.yellow(`${major}.${minor}`)}，请升级到${chalk.cyan(' 8.0 或以上')}.`, 'environment'));
    if (platform === 'darwin') {
      debug(`推荐用 ${chalk.cyan('https://github.com/creationix/nvm')} 管理和升级你的 node 版本。`, 'environment');
    } else if (platform === 'win32') {
      debug(`推荐到 ${chalk.cyan('https://nodejs.org/')} 下载最新的 node 版本。`, 'environment');
    }
    return false;
  }
  return true;
}


class Wpd {
  constructor(options) {
    const defaultOpt = {
      ableCSSModules: true,
      theme: null,
      define: null,
      html: {
        template: './public/index.html',
        filename: 'index.html',
      },
    };
    const { port, cwd } = options;
    const thisCwd = cwd || process.cwd();

    let configJsObj = null; // 配置文件对象
    let configJs_mergeObj = null; // 合并后的配置文件对象

    const configjs = path.resolve(thisCwd, './wpd.config.js');

    // 判断node版本和OS升级提示
    if (!OS_check()) {
      process.exit(1);
    }

    // 判断redbox-react是否已经安装
    if (!isFsExistsSync(path.resolve(thisCwd, 'node_modules/redbox-react/package.json'))) {
      console.error(`${chalk.red('还没有安装 redbox-react')} 请运行 ${chalk.cyan('npm i redbox-react -D')} 进行安装`);
      process.exit(1);
    }


    if (isFsExistsSync(configjs)) {
      configJsObj = require(configjs); // eslint-disable-line
      configJs_mergeObj = Object.assign(defaultOpt, configJsObj);

      const cmhObj = (configJs_mergeObj && configJs_mergeObj.html) || undefined;
      this.opt = {
        ableCSSModules: configJs_mergeObj.ableCSSModules,
        theme: configJs_mergeObj.theme,
        define: configJs_mergeObj.define,
        html: {
          template: (cmhObj && cmhObj.template) ? path.resolve(thisCwd, cmhObj.template) : path.resolve(thisCwd, './public/index.html'),
          filename: (cmhObj && cmhObj.html) || 'index.html',
        },
      };
    } else {
      console.log(chalk.red('没有找到配置文件'), 'environment');
      this.opt = {
        ...defaultOpt,
        html: {
          template: path.resolve(thisCwd, './public/index.html'),
          filename: 'index.html',
        },
      };
    }

    this.opt.port = parseInt(port, 10) || 8000;
    this.opt.cwd = thisCwd;


    // console.log('__dirname ===>', __dirname);
    // console.log('process.cwd() ===>', process.cwd());
    // console.log('require.resolve===>', require.resolve);


    console.log(chalk.cyan('============= 当前配置 ============= '));
    console.log(chalk.cyan(JSON.stringify(this.opt, null, 4)));
  }

  build() {
    process.env.NODE_ENV = 'production';
    const compiler = webpack(getWebpackConfig(this.opt, 'build'));
    compiler.run((err) => {
      if (err) {
        throw err;
      }
      // console.log(err, stats);
    });
  }


  start() {
    // console.log(this.options);
    process.env.NODE_ENV = 'development';

    const webpackConfig = getWebpackConfig(this.opt, 'start');

    // console.log(typeof this.opt.port);


    // 通过WebpackDevServer实例化的时候，不要将 dev server 选项放在 webpack 配置对象(webpack config object)中。而是，在创建选项时，将其作为第二个参数传递。
    // https://webpack.docschina.org/guides/hot-module-replacement#%E9%80%9A%E8%BF%87-node-js-api
    const WebpackDevServerOptions = {
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
      progress: true,
    };
    WebpackDevServer.addDevServerEntrypoints(webpackConfig, WebpackDevServerOptions);
    const server = new WebpackDevServer(webpack(webpackConfig), WebpackDevServerOptions);
    server.listen(WebpackDevServerOptions.port, WebpackDevServerOptions.host, (err) => {
      if (err) throw err;
    });
  }
}

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
