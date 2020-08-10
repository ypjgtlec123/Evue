// 打包electron的主配置
const path = require('path');
const webpack = require('webpack');

let mainConfig = {
    entry : {
        main : path.join(__dirname,'../src/electron-main/main.js')
    },

    output : {
        filename : '[name].js',
        path : path.join(__dirname,'../dist/electron'),
    },

    // 必须设置这个，否则打包时，会因reuqire('electron')，导致打包失败
    target: 'electron-main',

    node : {
        __dirname : process.env.NODE_ENV != 'production',
    },

    module : {
        rules : [
            {
                test : /\.js$/,
                use : 'babel-loader',
                exclude : /node_modules/
            },
            {
                test : /\.node$/,
                use : 'node-loader'
            }
        ]
    },

    plugins : [
        new webpack.NoEmitOnErrorsPlugin()
    ]
}

console.log(`now environment of main building is : ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV == 'production') {
    mainConfig.mode = 'production';
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
} else {
    mainConfig.mode = 'development';
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
}

module.exports = mainConfig;
