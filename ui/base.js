class Base {
  constructor() {}
  pipe = [];

  update() {
    let result = "";
    this.pipe.forEach(render => {
      result += render();
    });
    return result;
  }

  row(content) {
    this.pipe.push(() => renderLine(content));
    return this;
  }

  lines(array, handle) {
    this.pipe.push(() => renderLines(array, handle));
    return this;
  }
}


/**
 * 渲染一行内容
 * @param {String} content 一行内容
 */
function renderLine(content) {
  let result = content.replace(/\n/g, "");
  return result + "\n";
}

/**
 * 渲染多行内容
 * @param {Array} array 数组
 * @param {Function} handle 处理函数
 */
function renderLines(array, handle) {
  let result = "";
  array.forEach((elem, index) => {
    let content = handle(elem, index);
    result += renderLine(content);
  });
  return result
    ? result
    : "\n";
}

module.exports = Base;