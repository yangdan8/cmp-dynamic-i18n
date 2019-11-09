'use strict';

module.exports = function(configAll) {
  const { chainWebpack } = configAll;
  configAll.chainWebpack = cfgArg => {
    let cfgResult = cfgArg;
    if (typeof chainWebpack === 'function') {
      const cfgResultOrigin = chainWebpack(cfgResult);
      if (cfgResultOrigin) {
        cfgResult = cfgResultOrigin;
      }
    }
  };

  // 用于多页配置，默认是 undefined, vue inspect
  configAll.pages = {
    index: {
      // 入口文件
      entry: './src/main.ts',
      // 模板文件
      template: './public/index.html',
      // 输出文件
      filename: 'index.html',
      // 页面title
      title: 'title',
    },
    // 简写格式
    // 模板文件默认是 `public/subpage.html`
    // 如果不存在，就是 `public/index.html`.
    // 输出文件默认是 `subpage.html`.
    // subpage: 'src/subpage/main.js'
    // process.env.NODE_ENV === 'production'
    //   ? './src/settings/config.dist.ts'
    //   : './src/settings/config.dev.ts',
  };

  // 配置 webpack-dev-server 行为。
  configAll.devServer = {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    //proxy: null, // string | Object
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
      },
    },
    before: app => {},
  };
};
