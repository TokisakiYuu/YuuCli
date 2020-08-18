let {observable, observe, raw, isObservable} = require('observer-util-wheel');

const renderPipe = Symbol('render pipe');

class Base {
  constructor() {}

  [renderPipe] = [];

  row(content) {
    return this.pipe(lineRender, this.data, arguments);
  }

  rows(handle) {
    return this.pipe(linesRender, this.data, arguments);
  }

  // 数据层
  data(object) {
    if(isObservable(object)) {
      this.data = object;
    } else  {
      this.data = observable(object);
    }
    return this;
  }

  /**
   * 增加渲染管道
   * @param {Function} render 渲染函数
   * @param {Array} args 渲染参数
   */
  pipe(render, thisArg, args) {
    this[renderPipe].push(function $render() {
      return render.apply(thisArg, args);
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


/**
 * 渲染一行内容
 * @param {String} content 一行内容
 */
function lineRender(content) {
  let result = content.replace(/\n/g, "");
  return result + "\n";
}

/**
 * 渲染多行内容
 * @param {Array} array 数组
 * @param {Function} handle 处理函数
 */
function linesRender(handle) {
  return handle.apply(this);
}

module.exports = Base;