
// const spawn = require('cross-spawn');
// import { fork } from 'child_process';
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server/lib/Server');

const path = require('path');
const chalk = require('chalk');
const os = require('os');
const debug = require('debug');
const webpackConfig = require('../webpack.config');


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

class Wwas {
  constructor(options) {
    this.options = options;
    this.projectPath = path.resolve('./');

    process.env.CONTENT_BASE = this.projectPath;

    // const script = process.argv[2];
    // const args = process.argv.slice(3);

    // start 判断node版本和OS升级提示
    if (!OS_check()) {
      process.exit(1);
    }
    // End 判断node版本和OS升级提示
  }


  start() {
    // const args = process.argv.slice(3);
    console.log(this.projectPath);

    // console.log(webpackConfig);


    const server = new WebpackDevServer(webpack(webpackConfig));

    // console.log(server);

    // console.log(process.env);
    // console.log(process.env.PORT);

    // console.log(process.env.CONTENT_BASE);

    // CONTENT_BASE PORT
    // const wds = spawn('ls', ['-l']);

    // TODO
    // process.env.PORT 和 contBase变量 无效，webpack-dev-server 找不到工作目录

    // const wds = spawn('webpack-dev-server', [], {
    //   stdio: 'inherit',
    // });

    // wds.stdout.on('data', (data) => {
    //   console.log(`stdout: ${data}`);
    // });

    // wds.stderr.on('data', (data) => {
    //   console.log(`stderr: ${data}`);
    // });

    // wds.on('close', (code) => {
    //   console.log(`child process exited with code ${code}`);
    // });
    // console.log(this.options);

    // console.log(process.cwd());
    // console.log(path.resolve('./'));
  }
}

module.exports = Wwas;
