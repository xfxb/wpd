const merge = require('webpack-merge');// 用来合并配置文件
// const path = require('path');
const getBaseConf = require('./base');
const getDevConf = require('./dev');
const getProdConf = require('./prod');


function getWebpackConfig(opt, cmd) {
  const customConf = cmd === 'start' ? getDevConf(opt) : getProdConf(opt);
  const mergeConf = merge(getBaseConf(opt), customConf);

  // DefinePlugin 设置 自定义变量
  // const envArray = Object.keys(process.env).filter(item => /.*_ENV/g.test(item) && item !== 'NODE_ENV');
  for (const item of mergeConf.plugins) {
    if (item.constructor.name === 'DefinePlugin') {
      for (const [key, value] of Object.entries(opt.define)) {
        item.definitions[key] = JSON.stringify(value);
      }
    }
  }

  // console.log(mergeConf.plugins);

  return mergeConf;
}


module.exports = getWebpackConfig;
