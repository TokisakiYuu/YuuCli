const Base = require("./base");
const {viewRender} = require('./renders');
const {updateToScreen, registerScreen, showScreen} = require("./screenManager");
const {observe} = require("observer-util-wheel");

class Screen extends Base {
  constructor(name) {
    super();
    this.name = name;
    registerScreen(this);
  }
  
  _shouldFristUpdate = true;
  _eventStore = [];

  useView(view) {
    this.pipe(viewRender, arguments);
    return this;
  }

  update() {
    if(this._shouldFristUpdate) {
      let self = this;
      this._update = observe(() => updateToScreen(self));
      this._shouldFristUpdate = false;
    } else {
      this._update();
    }
    return this;
  }

  show() {
    showScreen(this.name);
    this.update();
  }
}


module.exports = Screen;