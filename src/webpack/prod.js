import path from 'path';
import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

function getProdConf(opt) {
  return {
    mode: 'production',
    devtool: 'hidden-source-map',
    plugins: [
      new CleanWebpackPlugin(['dist'], {
        root: path.resolve(opt.cwd),
      }),
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            warnings: false, // 删除无用代码时不输出警告
            drop_console: false, // 删除所有console语句，可以兼容IE
            collapse_vars: true, // 内嵌已定义但只使用一次的变量
            reduce_vars: true, // 提取使用多次但没定义的静态值到变量
          },
          output: {
            beautify: false, // 最紧凑的输出，不保留空格和制表符
            comments: false, // 删除所有注释
          },
        },
        parallel: true,
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),

    ],
  };
}

module.exports = getProdConf;
