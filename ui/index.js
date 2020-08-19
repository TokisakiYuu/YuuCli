let viewport = require('../viewport');
let Screen = require('./screen');
let View = require('./view');
let {dataModel} = require('./model');
let {log} = require('../debug');

let screen = new Screen("picker");

let data = dataModel({
  list: ["ZhangSan", "LiSi", "WangWu"],
  current: 0
});

let q = "hello world";

let pickerView = new View();
pickerView
  .rows(data.list, (name, index) => {
    return (data.current === index ? "->" : "  ") + " " + name;
  })
  .row(() => q)
screen
  .useView(pickerView)
  .update()

viewport.on("keypress", event => {
  log(event);
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
  } else if(name === "q") {
    q = "you pressed q";
    screen.update();
  }
})