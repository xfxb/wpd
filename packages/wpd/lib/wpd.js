'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = wpd;

var _require = require('path'),
    resolve = _require.resolve,
    join = _require.join;

var _require2 = require('fs'),
    existsSync = _require2.existsSync;

var getConfig = require('./getConfig');

var cwd = process.env.cwd || process.cwd();

function getWebpackConfig() {
    var configFile = 'wpd.config.js';

    var jsRCFile = resolve(cwd, configFile);
    var config = {};

    if (existsSync(jsRCFile)) {
        // no cache
        delete require.cache[jsRCFile];
        config = require(jsRCFile); // eslint-disable-line
        if (config.default) {
            config = config.default;
        }
    }

    console.log(1231231231, '------');

    return getConfig.default(_extends({}, config, {
        html: {
            template: config.html && config.html.template ? join(cwd, config.html.template) : join(cwd, './public/index.html'),
            filename: config.html && config.html.filename || 'index.html'
        },
        cwd: cwd
        // entry: {
        //   index: './index.js',
        // },
    }));
}

function wpd() {
    switch (process.argv[2]) {
        case 'dev':
            process.env.NODE_ENV = 'development';
            require('./dev').default({
                cwd: cwd,
                webpackConfig: getWebpackConfig()
            });
            break;
        case 'build':
            process.env.NODE_ENV = 'production';
            require('./build').default({
                cwd: cwd,
                webpackConfig: getWebpackConfig()
            });
            break;
        default:
            console.error('Unknown command ' + process.argv[2]);
            process.exit(1);
    }
}