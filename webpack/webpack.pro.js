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
};
