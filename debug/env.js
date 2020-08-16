let path = require('path');
const os = require('os');

const platform = os.platform();

let FIFO_NAME;
let whenTerminalLaunchExec;

if(platform === "darwin" || platform === "linux") {
    FIFO_NAME = "/tmp/yuucli_tokisakiyuu_at_qq_com.sock";
    whenTerminalLaunchExec = `reset;node client.js`;
} else if(platform === "win32") {
    FIFO_NAME = path.join('\\\\?\\pipe','\\yuucli_tokisakiyuu_at_qq_com.fifo');
    whenTerminalLaunchExec = "node client.js";
}


module.exports = {
    FIFO_NAME,
    whenTerminalLaunchExec
}