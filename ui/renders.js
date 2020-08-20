/**
 * 渲染一行内容
 * @param {String} content 一行内容
 */
function rowRender(content) {
  let result = "";
  if(typeof content === "function") {
    result = content();
  } else {
    result += content;
  }
  result = result.replace(/\n/g, " ");
  return result.trim() + "\n";
}

/**
 * 渲染多行内容
 * @param {Array} array 数组
 * @param {Function} handle 处理函数
 */
function rowsRender(array, handle) {
  let result = "";
  array.forEach((elem, index) => {
    result += handle(elem, index) + "\n";
  });
  return result;
}

/**
 * 绑定视图渲染器
 * @param {View} view 
 */
function viewRender(view) {
  if(!view.getRenderResult) return "";
  return view.getRenderResult();
}

module.exports = {
  rowRender,
  rowsRender,
  viewRender
};