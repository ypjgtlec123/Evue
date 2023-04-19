const { ipcRenderer } = require('electron');
let shortCutService = {
    /**
     * 处理全局快捷键监听
     * @event alt+1 正常屏
     * @event alt+2 右侧精简屏
     * @event alt+3 悬浮窗
     */
    dealGlobalShortCut (ipcRenderer,MainVue) {
        ipcRenderer.on('globalShortCut',function (event,val) {
            // 正常屏
            if (val && val.type == 'normal') {
                MainVue.$store.commit('setWindowSize',{size:'normal'});
            }
            // 右侧精简屏
            if (val && val.type == 'simple') {
                MainVue.$store.commit('setWindowSize',{size:'simple'});
            }
            // 悬浮窗
            if (val && val.type == 'small') {
                MainVue.$store.commit('setWindowSize',{size:'small'});
            }
        })
    }
    /**
     * 添加快捷键监听（已废弃，此方案是在窗体激活下下监听，使用体验不好）
     * @event alt+1 正常屏
     * @event alt+2 右侧精简屏
     * @event alt+3 悬浮窗
     */
    // addShortCutListener (MainVue) {
    //     document.addEventListener('keyup',function (event) {
    //         // 正常屏
    //         if (event.altKey && event.key == '1') {
    //             // 更新当前屏幕尺寸
    //             MainVue.$store.commit('setWindowSize',{size:'normal'});
    //             ipcRenderer.send('resizeWindow',{type : 'normal'});
    //         }
    //         // 右侧精简屏
    //         if (event.altKey && event.key == '2') {
    //             MainVue.$store.commit('setWindowSize',{size:'simple'});
    //             ipcRenderer.send('resizeWindow',{type : 'simple'});
    //         }
    //         // 悬浮窗
    //         if (event.altKey && event.key == '3') {
    //             MainVue.$store.commit('setWindowSize',{size:'small'});
    //             ipcRenderer.send('resizeWindow',{type : 'small'});
    //         }
    //     },true);
    // },
    
}

export { shortCutService };