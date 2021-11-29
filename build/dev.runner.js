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
        
        const compiler = webpack(vueConfig);
        const devServerOptions = { ...vueConfig.devServer, open: false };
        const server = new WebpackDevServer(devServerOptions, compiler);
        const runServer = async () => {
            console.log('\033[44;37m Starting server... \033[0m');
            await server.start();
          };
        runServer();
        resolve();
        
        // WebpackDevServer.addDevServerEntrypoints(vueConfig,devOptions);
        // const compiler = webpack(vueConfig);
        // const server = new WebpackDevServer(compiler,devOptions);
        
        // server.listen(8090,'localhost',() => {
        //     resolve();
        //     console.log('app running in http://localhost:8090');
        // })
    });
}


function startElectron () {
    console.log('\033[44;37m startElectron \033[0m');
    const electron = require('electron-connect').server.create();
    packageMain().then(() => {electron.start()});
    
    fs.watchFile(path.join(__dirname,'../src/electron-main/main.js'),(cur,prv)=>{
        packageMain().then(() => {electron.restart()});
    });
}

// 重新启动electron
function packageMain () {
    return new Promise((resolve,reject) => {
        webpack(mainConfig,(err,status) => {
            console.log(err,'main err');
            resolve();
        })
    })
}

init();