let viewport = require('./viewport');
let {log} = require('./debug');
let {observable, observe} = require('observer-util-wheel');

let data = observable({
    current: 0
});

observe(() => {
    viewport.draw(
`${data.current === 0? "->":"  "} 小明
${data.current === 1? "->":"  "} 小张
${data.current === 2? "->":"  "} 小芳`);
});

viewport.on('keypress', event => {
    log(event);
    let {name} = event.desc;
    let {current} = data;
    if(name === "up") {
        if(current === 0) {
            data.current = 2;
        } else {
            data.current -= 1;
        }
    } else if(name === "down") {
        if(current === 2) {
            data.current = 0;
        } else {
            data.current += 1;
        }
    }
});