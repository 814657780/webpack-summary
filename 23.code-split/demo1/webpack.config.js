const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// webpack是基于node的，所以遵循commonjs规范
module.exports = {
    // 入口文件
    // 单入口  单页面应用程序会这样写
    // entry:'./src/js/index.js',
    // 多入口  多页面应用程序
    entry:{
      // 多入口: 每个入口输出一个bundle
    //   main:'./src/js/index.js',
      index:'./src/js/index.js',
      test:'./src/js/test.js'
    },
    // 出口文件
    output:{
        // [name]:取文件名，对应entry中的main和test，如果把main改为index，那么输出的文件名就是index.hash.js
        filename:'js/[name].[contenthash:8].js',
        path:resolve(__dirname,'build')
    },
    // loader的配置
    module:{
        rules:[]
    },
    // plugins插件的配置
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            // 压缩html代码的设置
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        }),
        new CleanWebpackPlugin({
            cleanEveryBuildPatterns:['build']
        })

    ],
    // 模式
    mode:"production"
}