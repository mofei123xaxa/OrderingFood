const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭严格模式
  lintOnSave: false,
  devServer:{
   proxy:{
    '/api':{
      // target:'https://koa-nott-2860-4-1312875942.sh.run.tcloudbase.com', //这是请求地址
      target:'http://127.0.0.1:5000', //这是请求地址
      pathRewrite:{'^/api':''}, //就是把以/api开头换成''
    }
   }
  },
  publicPath:'./'
 

})
