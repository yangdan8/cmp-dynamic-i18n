'use strict';

const path = require('path');
module.exports = function(configAll) {
  const { chainWebpack, configureWebpack } = configAll;
  configAll.chainWebpack = cfgArg => {
    let cfgResult = cfgArg;
    if (typeof chainWebpack === 'function') {
      const cfgResultOrigin = chainWebpack(cfgResult);
      if (cfgResultOrigin) {
        cfgResult = cfgResultOrigin;
      }
    }

    cfgResult.resolve.alias
      .set('@', path.resolve('src'))
      .set('vue$', 'vue/dist/vue.esm.js');

    //组件html
    cfgResult.module
      .rule('html-file')
      .test(/(?<!index)\.html$/)
      .use('html-loader')
      .loader('html-loader')
      .tap(options => ({
        //压缩处理开关
        minimize: true,
        //以区分大小写的方式处理属性(对自定义HTML标记很有用)
        caseSensitive: true,
      }));
  };

  configAll.configureWebpack = cfgArg => {
    let cfgResult = cfgArg;
    if (typeof configureWebpack === 'function') {
      const cfgResultOrigin = configureWebpack(cfgResult);
      if (cfgResultOrigin) {
        cfgResult = cfgResultOrigin;
      }
    }

    const resolveObj = (cfgResult.resolve = cfgResult.resolve || {});
    const alias = (resolveObj.alias = resolveObj.alias || {});
    resolveObj.alias = Object.assign(alias, {
      vue$: 'vue/dist/vue.esm.js',
    });
  };
};
