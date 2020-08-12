const {parentPort} = require('worker_threads');
const net = require('net');
const colors = require('colors');

const {
    FIFO_NAME,
    openClient
} = require('./utils');

// 只允许一个客户端连接，并且客户端断开时服务端也销毁
let clientConnected = false;
// 客户端对象
let client = null;

// 创建IPC服务器
let server = net.createServer(connect => {
	connect.setEncoding('utf-8');
	connect.on('close', onClientDisconnectOrProcessExit);
	connect.on('error', err => {});
	connect.on("data", data => {});
	client = connect;
	clientConnected = true;
}).listen({path: FIFO_NAME}, openClient);

server.on("error", err => console.log(`[${colors.gray('DEBUG SERVER')}] ${colors.red(err)}`));

function onClientDisconnectOrProcessExit(code) {
	server.close();
	process.exit(code);
}
process.on('SIGINT', onClientDisconnectOrProcessExit);
process.on('exit', onClientDisconnectOrProcessExit);
process.on('uncaughtException', err => console.error(err));

// 如果是从worker线程启动的debug服务器，就监听并打印从主线程发来的消息
if(parentPort) {
	parentPort.on("close", onClientDisconnectOrProcessExit);
	parentPort.on("message", message => {
		if(!clientConnected) return;
		client.write(String(message));
	});
}
