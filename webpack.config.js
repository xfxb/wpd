const merge = require('webpack-merge');// 用来合并配置文件
const path = require('path');
const base = require('./webpack.base');
const dev = require('./webpack.dev.config');
const prod = require('./webpack.prod.config');

let other = '';

// console.log('----------------->', process.env.CONTENT_BASE);
// console.log('----------------->', path.resolve(process.cwd(), 'dist'));
// console.log('----------------->', parseInt(process.env.PORT, 10));


// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  other = dev;
} else {
  other = prod;
}

// console.log(other);
// console.log(merge(base, other));

const mergeConf = merge(base, other);

// DefinePlugin 设置 自定义变量 必须用 _ENV 结尾
const envArray = Object.keys(process.env).filter(item => /.*_ENV/g.test(item) && item !== 'NODE_ENV');
for (const item of mergeConf.plugins) {
  if (item.constructor.name === 'DefinePlugin') {
    for (const keyName of envArray) {
      item.definitions[`process.env.${keyName}`] = JSON.stringify(process.env[keyName]);
    }
  }
}
// console.log(mergeConf);

module.exports = mergeConf;
