const Base = require("./base");
const View = require("./view");
const {viewRender} = require('./renders');
const {updateToScreen, registerScreen} = require("./screenManager");
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
}


module.exports = Screen;