const net = require('net');
const colors = require('colors');

const {
    FIFO_NAME,
    openClient
} = require('./utils');

// 只允许一个客户端连接，并且客户端断开时服务端也销毁
let clientConnected = false;
// 客户端对象
let socket = null;
// 日志消息队列
let logMessageQueue = new Set();

// 创建IPC服务器
let server = net.createServer(connect => {
	connect.setEncoding('utf-8');
	connect.on('close', onClientDisconnectOrProcessExit);
	connect.on('error', err => {});
	connect.on("data", data => {});
	socket = connect;
	clientConnected = true;
	flushLogMessageQueue(logMessageQueue);
}).listen({path: FIFO_NAME}, () => {
	openClient();
});

server.on("error", err => console.log(`[${colors.gray('DEBUG SERVER')}] ${colors.red(err)}`));

function onClientDisconnectOrProcessExit(code) {
	server.close();
	let exitHandles = Array.from(new Set([
		...process.listeners('exit'),
		...process.listeners('SIGINT')
	]));
	if(exitHandles.length === 2 && exitHandles[0] === onClientDisconnectOrProcessExit) {
		process.exit(code);
	}
}
process.on('SIGINT', onClientDisconnectOrProcessExit);
process.on('exit', onClientDisconnectOrProcessExit);
process.on('uncaughtException', err => console.error(err));

/**
 * 刷出日志消息队列中的消息到客户端
 * @param {Set} queue
 */
function flushLogMessageQueue(queue) {
	if(!queue.size) return;
	for(let message of queue) {
		writeAndFlush(message);
	}
}

function writeAndFlush(message) {
	socket.write(message + "\n");
}

function log(message) {
	message = JSON.stringify(message);
	if(clientConnected) {
		writeAndFlush(message)
	} else {
		logMessageQueue.add(message);
	}
}

module.exports = { log };