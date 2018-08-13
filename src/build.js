import webpack from 'webpack';
import rimraf from 'rimraf';


export default function build(opts = {}) {
  const { webpackConfig } = opts;

  // 清理删除目录
  rimraf.sync(webpackConfig.output.path);

  webpack(webpackConfig, (err, stats) => {
    if (err) {
      console.error(err, stats);
    }
  });
}
