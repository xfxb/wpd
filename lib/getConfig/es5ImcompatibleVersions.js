'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPkgPath = getPkgPath;
exports.shouldTransform = shouldTransform;

var _path = require('path');

var _pkgUp = require('pkg-up');

var _pkgUp2 = _interopRequireDefault(_pkgUp);

var _semver = require('semver');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pkgPathCache = {};
var pkgCache = {};

var _require = require('es5-imcompatible-versions/package.json'),
    config = _require.config['es5-imcompatible-versions'];

function getPkgPath(filePath) {
  var dir = (0, _path.dirname)(filePath);
  if (dir in pkgPathCache) return pkgPathCache[dir];
  pkgPathCache[dir] = _pkgUp2.default.sync(filePath);
  return pkgPathCache[dir];
}

function shouldTransform(pkgPath) {
  if (pkgPath in pkgCache) return pkgCache[pkgPath];

  var _require2 = require(pkgPath),
      name = _require2.name,
      version = _require2.version; // eslint-disable-line


  pkgCache[pkgPath] = isMatch(name, version);
  return pkgCache[pkgPath];
}

function isMatch(name, version) {
  if (config[name]) {
    return Object.keys(config[name]).some(function (sv) {
      return (0, _semver.satisfies)(version, sv);
    });
  } else {
    return false;
  }
}