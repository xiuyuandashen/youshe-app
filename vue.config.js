module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8002', //对应自己的接口
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    },
    chainWebpack: config => {
      const svgRule = config.module.rule('svg')
      // 清除已有的所有 loader,如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
      svgRule.uses.clear()
      // 添加要替换的 loader
      svgRule.use('svg-sprite-loader').loader('svg-sprite-loader')
          .options({
              symbolId: 'icon-[name]'
          })
  }
}
