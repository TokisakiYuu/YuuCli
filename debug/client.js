let net = require('net');
let path = require('path');

let client= new net.Socket();
client.setEncoding('binary');
client.connect(path.join('\\\\?\\pipe','\\getAppListDesktop'),function () {
    //client给server发送数据
    client.write("hello");
    setInterval(() => {
      let date = new Date();
      client.write(`${date.getHours()} hours ${date.getMinutes()} Minutes ${date.getSeconds()} Seconds ${date.getMilliseconds()} ms`);
    }, 1000);
});
client.on('data',function(data){
    console.log("getApplistDesktopById "+data);
    //此处接受到数据后就可以进行合适的处理了
// client.end();
});
client.on('close',function(){
    console.log('Connection closed');
});
client.on('error',function(error){
    console.log('error:'+error);
    client.destory();
})