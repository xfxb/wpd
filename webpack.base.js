const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');


const config = {

  entry: path.resolve(process.cwd(), './src/index.js'),
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'index.[hash:8].js',
    publicPath: '',
  },
  resolve: {
    // 引入模块的时候，可以不用扩展名
    extensions: ['.js', '.less', '.json', '.css'],
    modules: [path.resolve(process.cwd(), 'node_modules')],
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  browsers: ['ie >= 10'],
                },
                // debug: true,
                include: [
                  'transform-es2015-shorthand-properties',
                ],
                useBuiltIns: true,
              }],
              'react',
              // 'react-hot-loader/babel',
            ],
            cacheDirectory: true,
            plugins: [
              'array-includes',
              'babel-plugin-add-module-exports',
              'babel-plugin-react-require',
              'transform-class-properties',
              'transform-decorators-legacy',
              'transform-object-rest-spread',
              ['import', { libraryName: 'antd', style: true }],
              'dva-hmr',
            ],
          },
        },
        include: path.join(process.cwd(), 'src'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?minimize', {
          loader: 'postcss-loader',
          options: {
            plugins: [
              autoprefixer,
            ],
          },
        }],
        // include: path.join(process.cwd(), './src'),
        // exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              javascriptEnabled: true,
              modifyVars: {
                '@primary-color': '#9E6A28',
                '@layout-body-background': '#fef8ee',
                '@layout-header-background': '#fef8ee',
                '@layout-trigger-background': '#fcdfb3',
                '@layout-sider-background': '#fcdfb3',
                '@menu-dark-submenu-bg': '#fcdfb3',
                '@menu-dark-bg': '#fef8ee',
                '@font-size-base': '13px',
                '@row-active-background': '#FBDCBD',
              },
            },
          },
        ],
        // include: /node_modules/,
      },
      {
        test: /\.(html|htm)/,
        use: 'html-loader',
      },
      {
        test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 5 * 1024,
            outputPath: '',
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './public', // 静态资源目录源地址
      ignore: ['index.html'],
      to: '', // 目标地址，相对于output的path目录
    }]),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), './public/index.html'),
      filename: 'index.html',
      //   hash: true,
    }),
  ],
};


module.exports = config;
