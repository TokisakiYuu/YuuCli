const Base = require("./base");
const View = require("./view");
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
  }

  update() {
    if(this._shouldFristUpdate) {
      let self = this;
      observe(() => updateToScreen(self));
      this._shouldFristUpdate = false;
    } else {
      this.update();
    }
  }
}

/**
 * 绑定视图渲染器
 * @param {View} view 
 */
function viewRender(view) {
  if(!view instanceof View) return "";
  return view.getRenderResult();
}

module.exports = Screen;