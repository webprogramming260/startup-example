const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map',
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:20400',
        changeOrigin: true,
      },
    },
  },
});
