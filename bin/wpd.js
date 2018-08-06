#!/usr/bin/env node

const program = require('commander');
const Wpd = require('../lib/wpd');

program
  .version(require('../package').version)
  .usage('<command> [options...]');

program
  .command('start')
  .alias('s')
  .description('开发模式')
  .option('-p, --port [string]', '设置开发模式的预览服务端口')
  .option('-c, --cwd [string]', '设置cwd路径')
  .action((options) => {
    new Wpd(options).start();
  });

program
  .command('build')
  .alias('d')
  .description('生产模式')
  .option('-c, --cwd [string]', '设置cwd路径')
  .action((options) => {
    new Wpd(options).build();
  });


program.parse(process.argv);

// 如果什么都没输，直接显示 帮助
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
