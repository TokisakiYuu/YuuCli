let path = require('path');
const os = require('os');
const term = require('term-launcher');
const platform = os.platform();

let FIFO_NAME;
let TERMINAL_LAUNCH_COMMOND;

if(platform === "darwin" || platform === "linux") {
    FIFO_NAME = "/tmp/yuucli_tokisakiyuu@qq_com";
    TERMINAL_LAUNCH_COMMOND = "reset;node client.js";
} else if(platform === "win32") {
    FIFO_NAME = path.join('\\\\?\\pipe','\\getAppListDesktop');
    TERMINAL_LAUNCH_COMMOND = "start cmd.exe /K node ./client.js";
}

// 打开客户端
function openClient() {
    if(platform === "darwin" || platform === "linux") {
        term.launchTerminal(TERMINAL_LAUNCH_COMMOND, __dirname);
    } else if(platform === "win32") {
        child_process.spawn(TERMINAL_LAUNCH_COMMOND, {shell: true});
    }
}


module.exports = {
    FIFO_NAME,
    openClient
}