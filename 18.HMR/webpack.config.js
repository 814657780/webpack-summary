/*
  HMR: hot module replacement 热模块替换/模块热替换
  作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
  极大的提高了构建速度

  样式文件：可以使用HMR功能：因为style-loader内部实现了~
  js文件：默认不能使用HMR功能 --->需要修改js代码，添加支持HMR功能的代码（module.hot.accept）
      注意：HMR功能对js的处理，只能处理非入口js文件的其他文件。因为入口js文件会把其他的js文件引入进来，一旦发生改变，会重新引入，重新进行加载。
  html文件：默认不能使用HMR功能，同时会导致问题：html文件改变不能自动刷新页面~ （html不要做HMR，因为html文件只有一个，这个一个改变了，每次都会重新打包）
      html文件改变不能自动刷新页面解决：修改entry入口，将html文件引入。将entry改成一个数组的形式，如下entry
*/ 
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { resolve } = require("path");
// webpack是基于node的，所以遵循commonjs规范
module.exports = {
    // 入口文件
    entry: ['./src/js/index.js','./src/index.html'],
    // 出口文件
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    // loader的配置
    module: {
        rules: [
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    //  把css转化js  
                    'css-loader'
                ]
             },
            {
               test:/\.less$/,
               use:[
                   'style-loader',
                   //  把css转化js  
                   'css-loader',
                   'less-loader'
               ]
            },
            {
                test:/\.(jpg|png|gif|jpeg)$/,
                loader:'url-loader'
            },
            {
                test:/\.html$/,
                loader:'html-loader'
            },
            // 其他资源,字体图标等
            {
                // 排除
                exclude: /\.(html|js|less|css|png|jpg|gif|jpeg)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:8].[ext]',
                    // 指定输出的文件夹名
                    outputPath:'media'
                }
            }
        ]
    },
    // plugins插件的配置
    plugins: [
        // 复制html
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 每次打包前清空build文件夹
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['build']
        })

    ],
    // 模式
    mode: 'development',
    // 开发服务器 devServer: 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器~~~）
    // 特点：只会在内存中编译打包，不会有任何输出（如果直接运行npx webpack-dev-server，是没有输出的，不会生成build文件夹，因为是在内存中编译打包。运行webpack会有输出，输出build文件夹）
    // 启动devServer指令为：npx webpack-dev-server，因为没有全局安装，所以用npx webpack-dev-server，如果全局安装了，可以直接webpack-dev-server，但是没有必要。
    // webapck全局安装了，所以可以直接用webpack，如果没有全局安装，就用 npx webpack
    // 一定要安装webpack-dev-server
    devServer: {
        // 项目构建后路径
        contentBase: resolve(__dirname, 'build'),
        //  启动gzip压缩
        compress: true,
        // 启动服务的端口号
        port: 3000,
        // 自动打开浏览器
        open:true,
        // 开启HMR功能
        hot: true
    }
}