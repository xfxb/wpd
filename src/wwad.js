
const webpack = require('webpack');
// const fs = require('fs');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server/lib/Server');

// const path = require('path');
const chalk = require('chalk');
const os = require('os');
const debug = require('debug');
const getWebpackConfig = require('./webpack');

const { isFsExistsSync } = require('./utils');


function OS_check() {
  const nodeVersion = process.versions.node;
  const versions = nodeVersion.split('.');
  const major = versions[0];
  const minor = versions[1];
  const platform = os.platform();

  if (((major * 10) + (minor * 1)) < 65) {
    debug(chalk.red(`Node version (${major}.${minor}) is not compatibile, ${chalk.cyan('must >= 6.5')}.`), 'environment');
    debug(chalk.red(`你的 Node 版本是 ${chalk.yellow(`${major}.${minor}`)}，请升级到${chalk.cyan(' 6.5 或以上')}.`, 'environment'));
    if (platform === 'darwin') {
      debug(`推荐用 ${chalk.cyan('https://github.com/creationix/nvm')} 管理和升级你的 node 版本。`, 'environment');
    } else if (platform === 'win32') {
      debug(`推荐到 ${chalk.cyan('https://nodejs.org/')} 下载最新的 node 版本。`, 'environment');
    }
    return false;
  }
  return true;
}


class Wwad {
  constructor(options) {
    // 判断node版本和OS升级提示
    if (!OS_check()) {
      process.exit(1);
    }
    const defaultOpt = {
      port: 8000,
      cwd: undefined,
      ableCSSModules: true,
      theme: null,
      define: null,
      html: {
        template: './public/index.html',
        filename: 'index.html',
      },
    };
    const { port, cwd } = options;

    let configJsObj = null; // 配置文件对象
    let configJs_mergeObj = null; // 合并后的配置文件对象

    const configjs = path.resolve(cwd || process.cwd(), './wwad.config.js');
    if (isFsExistsSync(configjs)) {
      configJsObj = require(configjs); // eslint-disable-line
      configJs_mergeObj = Object.assign(defaultOpt, configJsObj);
      // console.log(configJsObj);
    }

    // console.log('__dirname ===>', __dirname);
    // console.log('process.cwd() ===>', process.cwd());
    // console.log('require.resolve===>', require.resolve);

    const thisCwd = cwd || process.cwd();

    this.opt = {
      ...configJs_mergeObj,
      port: parseInt(port, 10) || 8000,
      cwd: thisCwd,
    };


    // 如果设置文件有设置html
    if (configJsObj.html) {
      this.opt.html.template = path.resolve(thisCwd, configJs_mergeObj.html.template);
      // 假如配置文件没有设置filename
      if (!configJsObj.html.filename) {
        this.opt.html.filename = 'index.html';
      }
    }

    // env: process.env.NODE_ENV,

    console.log(this.opt);
  }

  build() {
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

module.exports = Wwad;
