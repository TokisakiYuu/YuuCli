const net = require('net');
const {Writable, Transform} = require('stream');
const colors = require('colors');

// const writerStream = new Writable();

const {
    FIFO_NAME,
    openClient
} = require('./utils');

// 只允许一个客户端连接，并且客户端断开时服务端也销毁
let clientConnected = false;
// 客户端对象
let socket = null;
// 日志消息队列
let logMessageQueue = [];
// 缓冲区是否空闲
let isEmptyBuffer = true;

// 创建IPC服务器
let server = net.createServer(connect => {
	connect.setEncoding('utf-8');
	connect.on('close', onClientDisconnectOrProcessExit);
	connect.on('error', err => {});
	connect.on("data", data => {});
	connect.on("drain", onDrain);
	// socket.pipe(socket)
	socket = connect;
	clientConnected = true;
	flushLogMessageQueue(connect, logMessageQueue);
}).listen({path: FIFO_NAME}, () => {
	openClient();
});

server.on("error", err => console.log(`[${colors.gray('DEBUG SERVER')}] ${colors.red(err)}`));

function onClientDisconnectOrProcessExit(code) {
	server.close();
	process.exit(code);
}
process.on('SIGINT', onClientDisconnectOrProcessExit);
process.on('exit', onClientDisconnectOrProcessExit);
process.on('uncaughtException', err => console.error(err));

/**
 * 刷出日志消息队列中的消息到客户端
 */
function flushLogMessageQueue(connect, queue) {
	if(!queue.length) return;
	let message = queue.shift();
	writeAndFlush(message);
	flushLogMessageQueue(connect, queue)
}

/**
 * 当前输出流缓冲区空闲时
 */
function onDrain() {
	console.log("缓冲区空闲了");
}

function writeAndFlush(message) {
	socket.cork();
	socket.write(message);
	socket.uncork();
}

function log(message) {
	if(clientConnected) {
		writeAndFlush(message);
	} else {
		logMessageQueue.push(message);
	}
}

module.exports = { log };