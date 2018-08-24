import { join } from 'path';

const env = process.env.NODE_ENV;


export default function (context, opts = {}) {
  const plugins = [
    // adds React import declaration if file contains JSX tags
    require.resolve('babel-plugin-transform-runtime'),
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-react-require'),
    require.resolve('babel-plugin-transform-decorators-legacy'),
    require.resolve('babel-plugin-syntax-dynamic-import'),
    require.resolve('babel-plugin-transform-object-rest-spread'), // 对象添加spread操作符
    // ['import', { libraryName: 'antd', style: true }],
    [require.resolve('babel-plugin-import'), { libraryName: 'antd', style: true }],
  ];

  if (env === 'development') {
    plugins.push(
      [
        require.resolve('babel-plugin-react-transform'), {
          transforms: [{
            transform: require.resolve('react-transform-catch-errors'),
            imports: [
              join(opts.cwd, 'node_modules/react'),
              join(opts.cwd, 'node_modules/redbox-react'),
            ],
          }],
        },
      ],
    );
    plugins.push(
      require.resolve('babel-plugin-dva-hmr'),
    );
  }

  const browsers = opts.browsers || ['last 2 versions'];
  return {
    presets: [
      [
        require.resolve('babel-preset-env'),
        {
          include: [],
          useBuiltIns: true,
          targets: {
            browsers,
          },
        },
      ],
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-stage-0'),
    ],
    plugins,
  };
}
