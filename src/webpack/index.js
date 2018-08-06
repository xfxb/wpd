import merge from 'webpack-merge';
import chalk from 'chalk';
import getBaseConf from './base';
import getDevConf from './dev';
import getProdConf from './prod';


function getWebpackConfig(opt, cmd) {
  const customConf = cmd === 'start' ? getDevConf(opt) : getProdConf(opt);

  const mergeConf = merge(getBaseConf(opt), customConf);
  console.log(chalk.cyan(`process.env.NODE_ENV => ${process.env.NODE_ENV}`));

  // const envArray = Object.keys(process.env).filter(item => /.*_ENV/g.test(item) && item !== 'NODE_ENV');
  // DefinePlugin 设置 自定义变量
  if (opt.define) {
    for (const item of mergeConf.plugins) {
      if (item.constructor.name === 'DefinePlugin') {
        for (const [key, value] of Object.entries(opt.define)) {
          item.definitions[key] = JSON.stringify(value);
        }
      }
    }
  }
  // console.log(mergeConf.plugins);

  return mergeConf;
}


module.exports = getWebpackConfig;
