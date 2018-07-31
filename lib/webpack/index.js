'use strict';

var merge = require('webpack-merge'); // 用来合并配置文件
// const path = require('path');
var getBaseConf = require('./webpack.base.config');
var getDevConf = require('./webpack.dev.config');
var getProdConf = require('./webpack.prod.config');

function getWebpackConfig(opt) {
  var customConf = opt.env === 'development' ? getDevConf(opt) : getProdConf(opt);
  var mergeConf = merge(getBaseConf(opt), customConf);

  // DefinePlugin 设置 自定义变量 必须用 _ENV 结尾
  var envArray = Object.keys(process.env).filter(function (item) {
    return (/.*_ENV/g.test(item) && item !== 'NODE_ENV'
    );
  });
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = mergeConf.plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (item.constructor.name === 'DefinePlugin') {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = envArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var keyName = _step2.value;

            item.definitions['process.env.' + keyName] = JSON.stringify(process.env[keyName]);
          }
          // item.definitions['process.env.NODE_ENV'] = JSON.stringify(opt.env);
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }

    // console.log(mergeConf.plugins);
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return mergeConf;
}

module.exports = getWebpackConfig;