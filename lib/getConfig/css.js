'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (webpackConfig, opts) {
  var isDev = process.env.NODE_ENV === 'development';
  var cssOpts = _extends({
    importLoaders: 1,
    sourceMap: !opts.disableCSSSourceMap
  }, isDev ? {} : {
    minimize: !(process.env.CSS_COMPRESS === 'none' || process.env.COMPRESS === 'none' || process.env.NO_COMPRESS) ? {
      // ref: https://github.com/umijs/umi/issues/164
      minifyFontValues: false
    } : false
  }, opts.cssLoaderOptions || {});
  var theme = (0, _normalizeTheme2.default)(opts.theme);
  var postcssOptions = {
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    ident: 'postcss',
    plugins: function plugins() {
      return [require('postcss-flexbugs-fixes'), // eslint-disable-line
      (0, _autoprefixer2.default)({
        browsers: opts.browserslist || DEFAULT_BROWSERS,
        flexbox: 'no-2009'
      })].concat(_toConsumableArray(opts.extraPostCSSPlugins ? opts.extraPostCSSPlugins : []));
    }
  };
  var cssModulesConfig = {
    modules: true,
    localIdentName: isDev ? '[name]__[local]___[hash:base64:5]' : '[local]___[hash:base64:5]'
  };
  var lessOptions = _extends({
    modifyVars: theme,
    javascriptEnabled: true
  }, opts.lessLoaderOptions || {});

  var hasSassLoader = true;
  try {
    require.resolve('sass-loader');
  } catch (e) {
    hasSassLoader = false;
  }

  function applyCSSRules(rule, _ref) {
    var cssModules = _ref.cssModules,
        less = _ref.less,
        sass = _ref.sass;

    if (isDev) {
      rule.use('style-loader').loader(require.resolve('style-loader'));
    } else {
      rule.use('extract-css-loader').loader(require('mini-css-extract-plugin').loader);
    }

    rule.use('css-loader').loader(require.resolve('css-loader')).options(_extends({}, cssOpts, cssModules ? cssModulesConfig : {}));

    rule.use('postcss-loader').loader(require.resolve('postcss-loader')).options(postcssOptions);

    if (less) {
      rule.use('less-loader').loader(require.resolve('less-loader')).options(lessOptions);
    }

    if (sass && hasSassLoader) {
      rule.use('sass-loader').loader(require.resolve('sass-loader')).options(opts.sass);
    }
  }

  if (opts.cssModulesExcludes) {
    opts.cssModulesExcludes.forEach(function (exclude, index) {
      var rule = 'cssModulesExcludes_' + index;
      var config = webpackConfig.module.rule(rule).test(function (filePath) {
        return filePath.indexOf(exclude) > -1;
      });
      var ext = (0, _path.extname)(exclude).toLowerCase();
      applyCSSRules(config, {
        less: ext === '.less',
        sass: ext === '.sass' || ext === '.scss'
      });
    });
  }

  if (opts.cssModulesWithAffix) {
    applyCSSRules(webpackConfig.module.rule('.module.css').test(/\.module\.css/), {
      cssModules: true
    });
    applyCSSRules(webpackConfig.module.rule('.module.less').test(/\.module\.less/), {
      cssModules: true,
      less: true
    });
    applyCSSRules(webpackConfig.module.rule('.module.sass').test(/\.module\.(sass|scss)/), {
      cssModules: true,
      sass: true
    });
  }

  function cssExclude(filePath) {
    if (/node_modules/.test(filePath)) {
      return true;
    }
    if (opts.cssModulesWithAffix) {
      if (/\.module\.(css|less|sass|scss)$/.test(filePath)) return true;
    }
    if (opts.cssModulesExcludes) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = opts.cssModulesExcludes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var exclude = _step.value;

          if (filePath.indexOf(exclude) > -1) return true;
        }
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
    }
    return false;
  }

  applyCSSRules(webpackConfig.module.rule('css').test(/\.css/).exclude.add(cssExclude).end(), {
    cssModules: !opts.disableCSSModules
  });
  applyCSSRules(webpackConfig.module.rule('css-in-node_modules').test(/\.css/).include.add(/node_modules/).end(), {});
  applyCSSRules(webpackConfig.module.rule('less').test(/\.less/).exclude.add(cssExclude).end(), {
    cssModules: !opts.disableCSSModules,
    less: true
  });
  applyCSSRules(webpackConfig.module.rule('less-in-node_modules').test(/\.less/).include.add(/node_modules/).end(), {
    less: true
  });
  applyCSSRules(webpackConfig.module.rule('sass').test(/\.(sass|scss)/).exclude.add(cssExclude).end(), {
    cssModules: !opts.disableCSSModules,
    sass: true
  });
  applyCSSRules(webpackConfig.module.rule('sass-in-node_modules').test(/\.(sass|scss)/).include.add(/node_modules/).end(), {
    sass: true
  });

  if (!isDev) {
    var hash = opts.hash ? '.[contenthash:8]' : '';
    webpackConfig.plugin('extract-css').use(require('mini-css-extract-plugin'), [{
      filename: '[name]' + hash + '.css',
      chunkFilename: '[name]' + hash + '.chunk.css'
    }]);
  }
};

var _path = require('path');

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _normalizeTheme = require('./normalizeTheme');

var _normalizeTheme2 = _interopRequireDefault(_normalizeTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var DEFAULT_BROWSERS = ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'];