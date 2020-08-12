let net = require('net');
const MuteStream = require('mute-stream');
const cliCursor = require('cli-cursor');
const colors = require('colors');
const { jsonBeautify } = require('beautify-json')
let {FIFO_NAME} = require('./utils');

const LOG = `[${colors.green('LOG')}]`;
const DEBUG_CLIENT_WORD = `[${colors.gray('DEBUG CLIENT')}]`;
const RUNTIME_ERROR = `[${colors.red('RUNTIME_ERROR')}]`

// 静音输出流，防止用户输入
const msStdoout = new MuteStream();
msStdoout.pipe(process.stdout);
msStdoout.mute();

let client= new net.Socket();
client.setEncoding('utf-8');
client.connect(FIFO_NAME,function () {
    cliCursor.hide();
    console.log(`${DEBUG_CLIENT_WORD} ${colors.green('Connected to Debug server, Message from the server:')}`);
});
client.on('data', function(data){
    let dataObj = JSON.parse(data);
    console.log(`${LOG} ${makeNowTime()}`);
    // 服务端发来的任何消息都只做打印，因为这个客户端的作用就是显示消息而已
    jsonBeautify(dataObj);
});
client.on('close', function(){
    console.log(`${DEBUG_CLIENT_WORD} Connection closed`);
});
client.on('error', function(error){
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


function processExitHandle(code) {
    // 关掉客户端连接
    client.end();
    // 显示光标
    cliCursor.show();
    // 此进程的父进程就是终端，所以parent precess id就是终端进程id
    // 关掉终端窗口
    process.kill(process.ppid);
    process.exit(code);
}

process.on('SIGINT', processExitHandle);
process.on('exit', processExitHandle);
process.on('uncaughtException', err => {
    console.log(RUNTIME_ERROR);
    console.error(err);
});