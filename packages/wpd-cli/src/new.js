const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const download = require('download-git-repo');
const fs = require('fs');
const shell = require('shelljs');

export default function () {
  const cwd = process.cwd();

  // 判断目录是否为空
  fs.readdir(path.join(cwd), (err, files) => {
    if (err || (files && files.length > 0)) {
      console.log(chalk.red('当前文件夹不是空文件夹'));
      process.exit(1);
    }
  });

  const spinner = ora('正在从github下载wpd-template ');
  spinner.start();

  download('xfxb/wpd-example', path.join(cwd), {
    clone: false,
  }, (err) => {
    spinner.stop();
    if (err) {
      console.log(chalk.red('从github 下载失败 https://github.com/xfxb/wpd-example.git', err));
    } else {
      console.log(chalk.green('从github 下载成功 https://github.com/xfxb/wpd-example.git'));

      const spinnerInstall = ora('正在安装wpd-template ');
      spinnerInstall.start();

      shell.exec(
        `cd ${path.join(cwd)} && npm install --registry=https://registry.npm.taobao.org`,
        () => {
          console.log(
            chalk.green('npm install --registry=https://registry.npm.taobao.org 安装成功'),
          );
          spinnerInstall.stop();
        },
      );
    }
  });
}