'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (opts) {
  var env = {};
  Object.keys(process.env).forEach(function (key) {
    if (prefixRE.test(key) || key === 'NODE_ENV' || key === 'HMR' || key === 'SOCKET_SERVER') {
      env[key] = process.env[key];
    }
  });

  for (var key in env) {
    env[key] = JSON.stringify(env[key]);
  }

  var define = {};
  if (opts.define) {
    for (var _key in opts.define) {
      define[_key] = JSON.stringify(opts.define[_key]);
    }
  }

  return _extends({
    'process.env': env
  }, define);
};

var prefixRE = /^UMI_APP_/;