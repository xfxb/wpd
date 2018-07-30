const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function getProdConf(opt) {
  const PUBLIC_PATH = opt.cwd || process.cwd();

  return {
    mode: 'production',
    devtool: 'none',
    plugins: [
      new CleanWebpackPlugin([path.resolve(PUBLIC_PATH, 'dist')]),
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
          },
        },
        parallel: true,
      }),
      // keep module.id stable when vendor modules does not change
      new webpack.HashedModuleIdsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),

    ],
  };
}

module.exports = getProdConf;
