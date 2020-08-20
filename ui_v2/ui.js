const viewport = require("../viewport");
const {observe} = require("observer-util-wheel");

function row(string) {
  return string.replace(/\n/g, "") + "\n";
}

function space(sum) {
  if(sum <= 0) return "";
  return " " + space(sum - 1);
}

function creatScreen(components) {
  let _update = null;
  return {
    update() {
      if(!_update) {
        _update = observe(() => {
          viewport.draw(
            components
              .map(component => component())
              .join("")
          )
        })
      }else {
        _update();
      }
    }
  }
}

module.exports = {
  row,
  space,
  creatScreen
}