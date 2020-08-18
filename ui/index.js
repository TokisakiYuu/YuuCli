let viewport = require('../viewport');
let Screen = require('./screen');
let View = require('./view');
let Rows = require('./rows');

let screen = new Screen("picker");

let pickerView = new View();

pickerView
  .data({
    list: ["ZhangSan", "LiSi", "WangWu"],
    current: 0
  })
  .rows(() => {
    let rows = new Rows();
    this.list.forEach((name, index) => {
      rows.addRow((data.current === index ? "->" : "  ") + " " + name);
    })
    return rows;
  })
  .row("请选择一个...(按上下键移动)");

screen
  .useView(pickerView)
  .update()

// observe(() => screen.update());

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