const {
  rowRender,
  rowsRender
} = require('./renders');

const renderPipe = Symbol('render pipe');

class Base {
  constructor() {}

  [renderPipe] = [];

  row(content) {
    return this.pipe(rowRender, arguments);
  }

  rows(list, handle) {
    return this.pipe(rowsRender, arguments);
  }

  /**
   * 增加渲染管道
   * @param {Function} render 渲染函数
   * @param {Array} args 渲染参数
   */
  pipe(render, args) {
    this[renderPipe].push(function $render() {
      return render.apply(null, args);
    });
    return this;
  }

  getRenderResult() {
    let result = "";
    this[renderPipe].forEach(render => {
      result += render();
    });
    return result;
  }
}

module.exports = Base;