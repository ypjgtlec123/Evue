process.env.NODE_ENV = 'development';
// 开发环境启动相关
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');


const mainConfig = require('./webpack.main.config');

const vueConfig = require('./webpack.vue.config');

const devOptions = {
    contentBase : './dist/vue',
    hot : true,
    host : 'localhost'
}

function init () {
    startRender().then(() => {
        startElectron();
    })
}

function startRender () {
    console.log('startRender');
    return new Promise((resolve,reject) => {
        WebpackDevServer.addDevServerEntrypoints(vueConfig,devOptions);
        const compiler = webpack(vueConfig);
        const server = new WebpackDevServer(compiler,devOptions);
        
        server.listen(8080,'localhost',() => {
            resolve();
            console.log('app running in http://localhost:8080');
        })
    });
}


function startElectron () {
    const electron = require('electron-connect').server.create();
    copyMain().then(() => {electron.start()});
    
    fs.watchFile(path.join(__dirname,'../src/electron-main/main.js'),(cur,prv)=>{
        copyMain().then(() => {electron.restart()});
    });
}

// 重新启动electron
function copyMain () {
    return new Promise((resolve,reject) => {
        webpack(mainConfig,(err,status) => {
            console.log(err,'main err');
            resolve();
        })
    })
}

init();