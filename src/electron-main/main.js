const { app, BrowserWindow } = require('electron');
const path = require('path');
if (process.env.NODE_ENV != 'production') var client = require('electron-connect').client;

const URL = process.env.NODE_ENV == 'production' 
            ? path.join(__dirname,'../vue/index.html')
            : 'http://localhost:8090';

function createWindow () {
    const mainWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    webPreferences : {
        nodeIntegration : true,
        // 是否独立js的API 解决webpack-dev-server报错：required is not defined
        contextIsolation: false
    }
    });

    mainWindow.loadURL(URL);

    if (process.env.NODE_ENV != 'production') client.create(mainWindow);
    // 开发时，打开调试工具
    if (process.env.NODE_ENV != 'production') mainWindow.webContents.openDevTools();
}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
      app.quit()
    }
})
  
app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
})

module.exports = {
    app : app
}