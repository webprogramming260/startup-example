const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map',
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
