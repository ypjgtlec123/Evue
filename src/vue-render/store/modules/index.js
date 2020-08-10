// 自动导入所有模块

const files = require.context('.',false,/\.js$/);
const modules = {};


files.keys().map((item) => {
    if (item == './index.js') return ;
    modules[item.replace(/(\.\/|\.js)/g,'')] = files(item).default
})

export default modules;