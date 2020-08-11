const net = require('net');
const {
    FIFO_NAME,
    openClient
} = require('./utils');

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
}).listen(FIFO_NAME, 0, () => {
    openClient()
});

server.on("error",function(exception){
  console.log("server error:" + exception);
});

process.on('SIGINT', code => {
    server.close();
    process.exit(code);
});



// // Create Interface
// var interface = {
//     terminal: child_process.spawn(TERMINAL_LAUNCH_COMMOND, {shell: true}),
//     handler: console.log,
//     send: (data) => {
//         interface.terminal.stdin.write(data + '\n');
//     },
//     cwd: () => {
//         let cwd = fs.readlinkSync('/proc/' + interface.terminal.pid + '/cwd');
//         interface.handler({ type: 'cwd', data: cwd });
//     }
// };

// // Handle Data
// interface.terminal.stdout.on('data', (buffer) => {
//     interface.handler({ type: 'data', data: buffer });
// });

// // Handle Error
// interface.terminal.stderr.on('data', (buffer) => {
//     interface.handler({ type: 'error', data: buffer });
// });

// // Handle Closure
// interface.terminal.on('close', () => {
//     interface.handler({ type: 'closure', data: null });
// });