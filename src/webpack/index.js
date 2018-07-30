const merge = require('webpack-merge');// 用来合并配置文件
// const path = require('path');
const getBaseConf = require('./webpack.base.config');
const getDevConf = require('./webpack.dev.config');
const getProdConf = require('./webpack.prod.config');


function getWebpackConfig(opt) {
  const customConf = opt.env === 'development' ? getDevConf(opt) : getProdConf(opt);
  const mergeConf = merge(getBaseConf(opt), customConf);

  // DefinePlugin 设置 自定义变量 必须用 _ENV 结尾
  const envArray = Object.keys(process.env).filter(item => /.*_ENV/g.test(item) && item !== 'NODE_ENV');
  for (const item of mergeConf.plugins) {
    if (item.constructor.name === 'DefinePlugin') {
      for (const keyName of envArray) {
        item.definitions[`process.env.${keyName}`] = JSON.stringify(process.env[keyName]);
      }
      // item.definitions['process.env.NODE_ENV'] = JSON.stringify(opt.env);
    }
  }

  // console.log(mergeConf.plugins);

  return mergeConf;
}


module.exports = getWebpackConfig;
