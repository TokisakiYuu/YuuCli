const {row, space, useKeypressEvent, gotoScreen} = require("../../ui");

function list(data) {
  let {persons, current} = data;
  useKeypressEvent(event => {
    let {name} = event.desc;
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
      gotoScreen("pickerScreen_cn");
    }
  });
  return persons
    .map((name, index) => row(`${current === index ? "->" : space(2)} ${name}`))
    .join("");
}

module.exports = list;