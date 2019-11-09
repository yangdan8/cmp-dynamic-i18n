'use strict';

const configBase = require('./webpack/webpack.base');
const configDevelopment = require('./webpack/webpack.dev');
const configProduction = require('./webpack/webpack.pro');

const configAll = {
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 `/my-app/
  publicPath: '/',

  // 将构建好的文件输出到哪里
  outputDir: 'dist',

  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: '',

  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`true` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,

  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  runtimeCompiler: true,

  // babel-loader 默认会跳过 node_modules 依赖。
  // 通过这个选项可以显式转译一个依赖。
  transpileDependencies: [],

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  // 用于多页配置，默认是 undefined, vue inspect
  pages: {
    index: {
      // 入口文件
      entry: './src/main.ts',
      // 模板文件
      template: './public/index.html',
      // 输出文件
      filename: 'index.html',
      // 页面title
      title: '首页',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    // 简写格式
    // 模板文件默认是 `public/subpage.html`
    // 如果不存在，就是 `public/index.html`.
    // 输出文件默认是 `subpage.html`.
    // subpage: 'src/subpage/main.js'
    // process.env.NODE_ENV === 'production'
    //   ? './src/settings/config.dist.ts'
    //   : './src/settings/config.dev.ts',
  },

  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  // chainWebpack: config => {},
  // configureWebpack: config => {},

  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: true,

    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {},

    // // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // // 这个选项不会影响 `*.vue` 文件。
    // modules: false,
  },

  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,

  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
  // pwa: {},

  // 三方插件的选项
  pluginOptions: {
    //
  },
};

// webpack配置独立配置
configBase(configAll);
if (process.env.NODE_ENV === 'development') {
  configDevelopment(configAll);
} else {
  configProduction(configAll);
}

module.exports = configAll;
