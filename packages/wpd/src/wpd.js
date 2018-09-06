const { resolve, join } = require('path');
const { existsSync } = require('fs');

const getConfig = require('./getConfig');

const cwd = process.env.cwd || process.cwd();

function getWebpackConfig() {
  const configFile = 'wpd.config.js';

  const jsRCFile = resolve(cwd, configFile);
  let config = {};

  if (existsSync(jsRCFile)) {
    // no cache
    delete require.cache[jsRCFile];
    config = require(jsRCFile); // eslint-disable-line
    if (config.default) {
      config = config.default;
    }
  }

  return getConfig.default({
    ...config,
    html: {
      template:
        config.html && config.html.template
          ? join(cwd, config.html.template)
          : join(cwd, './public/index.html'),
      filename: (config.html && config.html.filename) || 'index.html',
    },
    cwd,
    // entry: {
    //   index: './index.js',
    // },
  });
}

export default function wpd() {
  switch (process.argv[2]) {
    case 'dev':
      process.env.NODE_ENV = 'development';
      require('./dev').default({
        cwd,
        webpackConfig: getWebpackConfig(),
      });
      break;
    case 'build':
      process.env.NODE_ENV = 'production';
      require('./build').default({
        cwd,
        webpackConfig: getWebpackConfig(),
      });
      break;
    default:
      console.error(`Unknown command ${process.argv[2]}`);
      process.exit(1);
  }
}
