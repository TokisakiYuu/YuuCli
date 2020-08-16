let net = require('net');
const MuteStream = require('mute-stream');
const cliCursor = require('cli-cursor');
const colors = require('colors');
const { jsonBeautify } = require('beautify-json')
let {FIFO_NAME} = require('./env');

process.title = "YuuCli Debug Terminal";

const LOG = `[${colors.green('LOG')}]`;
const DEBUG_CLIENT_WORD = `[${colors.gray('DEBUG CLIENT')}]`;
const RUNTIME_ERROR = `[${colors.red('RUNTIME_ERROR')}]`

// 静音输出流，防止用户输入
const msStdoout = new MuteStream();
msStdoout.pipe(process.stdout);
msStdoout.mute();

let socket = new net.Socket();
socket.setEncoding('utf-8');
socket.connect(FIFO_NAME,function () {
    cliCursor.hide();
    console.log(`${DEBUG_CLIENT_WORD} ${colors.green('Connected to Debug server, Message from the server:')}`);
});

socket.on('data', data => {
    // 此处可能会收到多条消息，用\n隔开
    let blocks = data.split("\n");
    blocks
        .filter(block => block.length > 0)
        .forEach(block => {
            let dataObj = JSON.parse(block);
            console.log(`${LOG} ${makeNowTime()}`);
            jsonBeautify(dataObj);
        })
});
socket.on('close', () => {
    console.log(`${DEBUG_CLIENT_WORD} Connection closed`);
    processExitHandle(0);
});
socket.on('error', error => {
    console.log(`${DEBUG_CLIENT_WORD} ${colors.red(error)}`);
})

// 拼接时间
function makeNowTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ms = date.getMilliseconds();
    return colors.grey(`${hours}:${minutes}:${seconds}.${ms}`);
}


function processExitHandle() {
    // 关掉客户端连接
    socket.end();
    // 显示光标
    cliCursor.show();
    // 退出cmd进程(终端窗口)
    process.kill(process.ppid);
    // 退出node进程
    process.kill(process.pid);
}

process.on('SIGINT', processExitHandle);
process.on('exit', processExitHandle);
process.on('uncaughtException', err => {
    console.log(RUNTIME_ERROR);
    console.error(err);
});