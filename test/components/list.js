const {row, space} = require("../../ui_v2/ui");
const viewport = require("../../viewport");
const data = require("../data");

function list() {
  let {persons, current} = data;
  return persons
    .map((name, index) => row(`${current === index ? "->" : space(2)} ${name}`))
    .join("");
}

viewport.on("keypress", event => {
  let {name} = event.desc;
  let {current} = data;
  let listLength = data.persons.length;
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
    data.persons.push("yuu")
  }
})

module.exports = list;