# wpd 类似roadhog的构建工具

## 说明

使用 webpack and.design dva 来构建项目

### 依赖

webpack (v4)

webpack-dev-server (v3)

ant.design (v2 - v3)

dva (v1 - v2)

## 快速使用

1. 运行 `npm i wpd -D` 进行安装。

2. 在项目目录建立 `wpd.config.js` 文件，并且设置需要的参数。

    例如：
    ```js
    module.exports = {
        html: {
            template: './src/index.ejs',
        },
        define: {
            'process.env.API_ENV': process.env.API_ENV,
        },
    };
    ```

3. 在 `package.json` 的 scripts 参数添加脚本。

    例如：
    ```js
    "scripts": {
        "start": "cross-env API_ENV=qa002 wpd start -p 8002",
        "build": "cross-env API_ENV=qa002 wpd build"
    }
    ```
4. 运行 `npm run start`

## 配置文件 wpd.config.js

| 参数 | 是否必填 | 值类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| ableCSSModules | 否 | boolean | true | css modules 的开关 |
| theme | 否 | object | null | ant.design主题的变量 |
| define | 否 | object | null | webpack DefinePlugin 全局变量设置 |
| html | 否| object | {template, filename} | webpack HtmlWebpackPlugin 变量 |

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

## 命令

### wpd start 开发模式

- `-p` 设置开发模式的预览服务端口

- `-c` 设置项目路径

### wpd build 生产模式

- `-c` 设置项目路径

## npm包二次开发

- 调试模式 `npm run watch` 在内存中从src编译到lib，监听文件改动

- 生产模式 `npm run build` 从src实际构建到lib

## 参考，感谢

[roadhog](https://github.com/sorrycc/roadhog)

[wcf](https://github.com/liangklfangl/wcf)