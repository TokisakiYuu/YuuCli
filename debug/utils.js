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
    FIFO_NAME = path.join('\\\\?\\pipe','\\yuucli_tokisakiyuu@qq_com.sock');
    TERMINAL_LAUNCH_COMMOND = "node client.js";
}

// 打开客户端
function openClient() {
    term.launchTerminal(TERMINAL_LAUNCH_COMMOND, __dirname);
}


module.exports = {
    FIFO_NAME,
    openClient
}