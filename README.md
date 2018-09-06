# wpd 类似 roadhog 的构建工具

## 说明

使用 webpack and.design dva 来构建项目

### 依赖

webpack (v4)

webpack-dev-server (v3)

ant.design (v2 - v3)

dva (v1 - v2)

## 快速使用

1. 运行 `npm i wpd redbox-react -D` 进行安装。

2. 在项目目录建立 `wpd.config.js` 文件，并且设置需要的参数。

   例如：

   ```js
   module.exports = {
     html: {
       template: "./src/index.ejs"
     },
     define: {
       "process.env.API_ENV": process.env.API_ENV
     }
   };
   ```

3. 在 `package.json` 的 scripts 参数添加脚本。

   例如：

   ```js
   "scripts": {
       "dev": "cross-env API_ENV=qa002 wpd dev",
       "build": "cross-env API_ENV=qa002 wpd build"
   }
   ```

4. 运行 `npm run dev`

## 配置文件 wpd.config.js

| 参数           | 是否必填 | 值类型  | 默认值               | 说明                              |
| -------------- | -------- | ------- | -------------------- | --------------------------------- |
| ableCSSModules | 否       | boolean | true                 | css modules 的开关                |
| theme          | 否       | object  | null                 | ant.design 主题的变量             |
| define         | 否       | object  | null                 | webpack DefinePlugin 全局变量设置 |
| html           | 否       | object  | {template, filename} | webpack HtmlWebpackPlugin 变量    |

```js
// 默认值
{
    ableCSSModules: true,
    theme: null,
    define: null,
    html: {
        template: './public/index.html',
        filename: 'index.html',
    },
};
```

## 安装`wpd-cli`快速开始新项目

1. 安装 `npm i wpd-cli -g`

2. 运行 `wpd-cli new`

> 模板文件在[wpd-example](https://github.com/xfxb/wpd-example)

## 命令

### wpd dev 开发模式

### wpd build 生产模式

## npm 包二次开发

- 调试模式 `npm run watch` 在内存中从 src 编译到 lib，监听文件改动

- 生产模式 `npm run build` 从 src 实际构建到 lib

## 疑答

### redbox-react 为什么一定要安装

因为 babel-plugin-dva-hmr@0.4.1 依赖 redbox-react，引用的模块路径是项目路径。

## 参考，感谢

[roadhog](https://github.com/sorrycc/roadhog)

[wcf](https://github.com/liangklfangl/wcf)
