/*
 loader: 1、下载  2、使用（配置loader）
 plugins：1、下载 2、引入  3、使用
*/ 
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
    // 入口文件
    entry:'./src/index.js',
    // 出口文件
    output:{
        filename:'built.js',
        path:resolve(__dirname,'build')
    },
    // loader
    module:{
        rules:[
     //loader的配置 
        ]
    },
    // plugins
    plugins:[
        // plugins的配置
        // html-webpack-plugin
        // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源(JS/CSS)
        // 如果有这样的需求 ，需要有结构的html文件，需要加配置，template
        new HtmlWebpackPlugin({
            // 复制./src/index.html文件，并自动引入打包输出的所有资源(JS/CSS)
            template:'./src/index.html'
        })

    ],
    // 模式
    mode:'development'
    // mode:'production'
}