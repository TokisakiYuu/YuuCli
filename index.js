const {createViewport} = require("./createViewport");

let port = createViewport();


port.draw("时钟：");
setInterval(() => {
    let date = new Date();
    port.draw(`${date.getHours()}点${date.getMinutes()}分${date.getSeconds()}秒${date.getMilliseconds()}毫秒`);
}, 1000)

port.on("close", () => {});