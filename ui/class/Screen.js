const {observe, observable} = require("observer-util-wheel");
const viewport = require("../../viewport");

class Screen {
  constructor({components, data}) {
    this.components = components;
    this.obData = observable(data);
  }

  update() {
    let {obData} = this;
    if(!this._update) {
      this._update = observe(() => {
        viewport.removeAllEventHandler();
        viewport.draw(
          this.components
            .map(component => {
              let result = component(obData);
              return result;
            })
            .join("")
        );
      })
    }else {
      this._update();
    }
  }
}

module.exports = Screen;