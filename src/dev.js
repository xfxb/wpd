import webpack from 'webpack';
// import WebpackDevServer from 'webpack-dev-server';
import WebpackDevServer from 'webpack-dev-server/lib/Server';


const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8000;

// process.env.NODE_ENV = 'development';

export default function dev({
  webpackConfig,
  port,
}) {
  // compiler 对象上挂载了相应的 webpack 事件钩子
  // const compiler = webpack(webpackConfig);
  // console.log(webpackConfig);

  const WebpackDevServerOptions = {
    // disableHostCheck: true,
    // compress: true,
    // clientLogLevel: 'none',
    // hot: true,
    // quiet: true,
    // headers: {
    //   'access-control-allow-origin': '*',
    // },
    // // publicPath: webpackConfig.output.publicPath,
    // watchOptions: {
    //   ignored: /node_modules/,
    // },
    // historyApiFallback: false,
    // overlay: false,
    // host: HOST,

     // contentBase: false,
     host: HOST,
     // disableHostCheck: true,
     // contentBase: path.resolve(process.cwd(), 'public'),
     // publicPath: '/',
     port: PORT,
     hot: true,
     compress: true,
     historyApiFallback: true,
     inline: true,
     progress: true,
  };
  WebpackDevServer.addDevServerEntrypoints(webpackConfig, WebpackDevServerOptions);
  const server = new WebpackDevServer(webpack(webpackConfig), WebpackDevServerOptions);

  // const server = new WebpackDevServer(compiler, serverConfig);

  server.listen(PORT, HOST, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
