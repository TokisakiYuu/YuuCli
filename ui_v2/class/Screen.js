const {observe, observable} = require("observer-util-wheel");
const viewport = require("../../viewport");

class Screen {
  constructor({components, data}) {
    this.components = components;
    this.obData = observable(data);
  }

  update() {
    let {obData} = this;
    viewport.removeAllEventHandler();
    if(!this._update) {
      this._update = observe(() => {
        viewport.draw(
          this.components
            .map(component => {
              let result = component(obData);
              return result;
            })
            .join("")
        )
      })
    }else {
      this._update();
    }
  }
}

function createComponentDesc() {
  const desc = {};
  const receiver = {};
  desc.keypress = {};
  desc.keypress.on = function(fn) {
    if(!receiver.keypress) {
      receiver.keypress = [];
    }
    receiver.keypress.push(fn);
  }
  desc.keypress.rm = function(fn) {
    if(!receiver.keypress) return;
    receiver.keypress = receiver.keypress.filter(handle => handle !== fn);
  }
  return {desc, receiver}
}

module.exports = Screen;