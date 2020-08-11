const net = require('net');
let path = require('path');
const fs = require('fs');
const child_process = require('child_process');

// 创建IPC服务器
let server = net.createServer(function (connect) {
	connect.setEncoding('binary');
	connect.on('error',function(exception){
		console.log('socket error:' + exception);
		connect.end();
	});
	//客户端关闭事件
	connect.on('close',function(data){
		console.log('client closed!');
	});
	connect.on("data",function (data) {
		//server接受到client发送的数据
		console.log(data);
        //server给client发送数据	
		connect.write("hello");
	})
}).listen(path.join('\\\\?\\pipe','\\getAppListDesktop'));

server.on("error",function(exception){
  console.log("server error:" + exception);
});

// Create Interface
var interface = {
    terminal: child_process.spawn("start cmd.exe /K node ./client.js", {shell: true}),
    handler: console.log,
    send: (data) => {
        interface.terminal.stdin.write(data + '\n');
    },
    cwd: () => {
        let cwd = fs.readlinkSync('/proc/' + interface.terminal.pid + '/cwd');
        interface.handler({ type: 'cwd', data: cwd });
    }
};

// Handle Data
interface.terminal.stdout.on('data', (buffer) => {
    interface.handler({ type: 'data', data: buffer });
});

// Handle Error
interface.terminal.stderr.on('data', (buffer) => {
    interface.handler({ type: 'error', data: buffer });
});

// Handle Closure
interface.terminal.on('close', () => {
    interface.handler({ type: 'closure', data: null });
});