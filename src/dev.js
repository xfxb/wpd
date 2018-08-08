import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const HOST = process.env.HOST || '0.0.0.0';

// process.env.NODE_ENV = 'development';

export default function dev({
  webpackConfig,
  port,
}) {
  // compiler 对象上挂载了相应的 webpack 事件钩子
  const compiler = webpack(webpackConfig);
  console.log(webpackConfig);

  const serverConfig = {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    hot: true,
    quiet: true,
    headers: {
      'access-control-allow-origin': '*',
    },
    // publicPath: webpackConfig.output.publicPath,
    watchOptions: {
      ignored: /node_modules/,
    },
    historyApiFallback: false,
    overlay: false,
    host: HOST,
  };

  const server = new WebpackDevServer(compiler, serverConfig);

  server.listen(port || 8000, HOST, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
