const fs = require('fs');

/**
 * 判断文件是或否存在
 * @param {string} path 文件路径
 * @returns {boolean}
 */
function isFsExistsSync(path) {
  try {
    fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
  } catch (e) {
    return false;
  }
  return true;
}

module.exports = {
  isFsExistsSync,
};
