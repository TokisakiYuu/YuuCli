const viewport = require('./viewport');
const {log} = require("./debug");

// viewport.on("keypress", e => {
//     // let keyname = e.desc.name;
//     // if(keyname === "backspace") {
//     //     body = body.substring(0, body.length - 1);
//     // } else {
//     //     body += e.code;
//     // }
//     if(e.desc.name === "backspace") {
//         viewport.showCursor();
//     }
//     if(e.desc.name === "return") {
//         viewport.hideCursor();
//     }
//     viewport.draw(e.code);
//     log(e);
// });