"use strict";
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = process.env.port || process.env.npm_config_port || 9500; // dev port

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  //打包过后的文件夹名
  outputDir: "wwwroot",
  //设置打包后的静态资源的文件夹名
  assetsDir: "web",
  //文件名是否添加hash值
  filenameHashing: true,

  //在多页模式下构建时，Webpack配置将包含不同的插件
  // (将有多个HTML Webpack插件和预加载Webpack插件实例).
  // 如果您试图修改这些插件的选项，请确保运行vue inspect。
  pages: {
    index: {
      // 入口文件
      "babel-polyfill": "babel-polyfill",
      entry: "src/main.js",

      // the source template
      template: "src/pages/index/index.html",
      // 打包后的html文件名
      filename: "index.html",
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "BTMS",
      // chunks to include on this pages, by default includes
      //  默认情况下，要包含在此页上的块包括
      //  extracted common chunks and vendor chunks.
      //  提取的公共块和供应商块
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
    // when using the entry-only string format,
    //  使用仅输入字符串格式时
    // template is inferred to be `public/subpage.html`
    //  模板被推断为'public/subpage.html`
    // and falls back to `public/index.html` if not found.
    //  如果找不到，则返回到“public/index.html”
    // Output filename is inferred to be `subpage.html`.
    //  输出文件名被推断为'subpage.html`
    // subpage: ''
  },

  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,

  // 默认情况下 babel-loader 忽略其中的所有文件 node_modules
  transpileDependencies: [],

  // 生产环境 sourceMap
  productionSourceMap: false,

  // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
  // corsUseCredentials: false,
  // webpack 配置，键值对象时会合并配置，为方法时会改写配置
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration
  configureWebpack: {
    devtool: "eval-source-map",
    name: "mobile Rem Test",
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },

  // webpack 链接 API，用于生成和修改 webapck 配置
  // https://github.com/mozilla-neutrino/webpack-chain
  chainWebpack: config => {
    // 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
    config.optimization.splitChunks({
      cacheGroups: {}
    });

    // 'src/lib' 目录下为外部库文件，不参与 eslint 检测
    config.module
      .rule("eslint")
      .exclude.add("/Users/maybexia/Downloads/FE/community_built-in/src/lib")
      .end();
  },

  // 配置高于chainWebpack中关于 css loader 的配置
  css: {
    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
    extract: true,

    // 是否构建样式地图，false 将提高构建速度
    sourceMap: false,

    // css预设器配置项
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
      },

      postcss: {
        // options here will be passed to postcss-loader
      }
    }
  },

  // 支持webpack dev server的所有选项
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    host: "localhost", //target host
    port: port,
    //proxy:{'/api':{}},代理器中设置/api,项目中请求路径为/api的替换为target
    proxy: {
      "/api": {
        target: "http://bedding.sific.com.cn:31415", //代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        //ws: true, // proxy websockets
        //pathRewrite方法重写url
        pathRewrite: {
          "^/api": "/api"
          //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
          //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
        }
      }
    }
  },
  // 构建时开启多进程处理 babel 编译
  parallel: require("os").cpus().length > 1,

  // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  // 第三方插件配置
  pluginOptions: {}
};
