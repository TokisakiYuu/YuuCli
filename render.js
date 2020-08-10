const { Interface } = require("readline");
const ansiEscapes = require('ansi-escapes');
const {createViewport} = require("./createViewport");

let {columns, rows} = process.stdout;
const terminalSize = {rows, columns};

// 视口内容的总行数，随内容动态增减
let viewportLines = 1;

/**
 * 写入内容到视口
 * @param {String} content 内容
 * @param {Interface} viewport readline interface实例
 */
function renderToViewport(content = "", viewport) {
  viewport.output.write(ansiEscapes.eraseLines(viewportLines));
  viewportLines = getContentLines(content);
  viewport.write(content);
}

/**
 * 获取一段文本的行数
 * @param {String} content
 */
function getContentLines(content) {
  return content.match(/\n/g).length + 1;
}

/**
 * 监听终端窗口大小变化
 */
process.stdout.on('resize', () => {
  let {columns, rows} = process.stdout;
  terminalSize.rows = rows;
  terminalSize.columns = columns;
  console.log(`rows: ${rows}, columns: ${columns}`);
});


let port = createViewport();
renderToViewport("第一行\n第二行\n第三行", port);
// setTimeout(() => {
  renderToViewport("第四行\n第五行\n第六行", port);
// }, 2000)

module.exports = {
  renderToViewport
}