const viewport = require('./viewport');
const {log} = require("./debug");

// setInterval(() => {
//     viewport.draw(Date.now());
// }, 1000);
let body = "";

viewport.on("keypress", e => {
    let keyname = e.desc.name;
    if(keyname === "backspace") {
        body = body.substring(0, body.length - 1);
    } else {
        body += e.code;
    }
    viewport.draw(body);
    log(e);
});