#!/usr/bin/env node

// const path = require('path');
const program = require('commander');
const Wad = require('../libs/wwad');

program
// 获得版本
  .version(require('../package').version)
  .usage('<command> [options]');

program
  .command('start')
  .alias('s')
  .description('开发模式')
  .option('-p, --port [number]', '设置服务端口')
  .action((options) => {
    new Wad(options).start();
  });

program
  .command('build')
  .alias('d')
  .description('生产模式')
  .action((options) => {
    new Wad(options).build();
  });


program.parse(process.argv);

// 如果什么都没输，直接显示 帮助
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
