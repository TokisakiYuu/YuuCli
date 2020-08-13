const viewport = require('./viewport');
const {log} = require("./debug");

setInterval(() => {
    viewport.draw(Date.now());
}, 1000);

viewport.on("keypress", e => {
    log(e);
});