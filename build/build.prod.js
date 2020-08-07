// 总体打包
const webpack = require('webpack');

process.env.NODE_ENV = 'production';

const mainConfig = require('./webpack.main.config');
const vueConfig = require('./webpack.vue.config');

webpack(vueConfig,(err,status) => {
    webpack(mainConfig,(err,status) => {

    })
});
