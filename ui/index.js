let viewport = require('../viewport');
let Screen = require('./screen');
let {observable, observe} = require('observer-util-wheel');

let data = observable({
  list: ["张三", "李四", "王五"],
  current: 0
});

let screen = new Screen("picker");

screen
  .lines(data.list, (name, index) => {
    return (data.current === index ? "->" : "  ") + " " + name;
  })
  .row("请选择一个...(按上下键移动)");


observe(() => {
  viewport.draw(screen.update());
});

viewport.on("keypress", event => {
  let {name} = event.desc;
  let {current} = data;
  let listLength = data.list.length;
  if(name === "up") {
    if(current === 0) {
        data.current = listLength - 1;
    } else {
        data.current -= 1;
    }
  } else if(name === "down") {
      if(current === listLength - 1) {
          data.current = 0;
      } else {
          data.current += 1;
      }
  } else if(name === "return") {
    data.list.push("有鱼")
  }
})