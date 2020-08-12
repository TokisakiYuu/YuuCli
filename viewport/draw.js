const ansiEscapes = require('ansi-escapes');

let {columns, rows} = process.stdout;
const terminalSize = {rows, columns};

// 视口内容的总行数，随内容动态增减
let viewportLines = 1;


/**
 * 绘制帧
 * @param {String} content 内容
 * @param {*} interface 
 */
function draw(content = "", interface) {
  interface.output.unmute();
  interface.output.write(ansiEscapes.eraseLines(viewportLines));
  viewportLines = getContentLines(content);
  interface.output.write(content);
  interface.output.mute();
}

function getContentLines(content) {
  let results = content.match(/\n/g);
  return results
    ? results.length + 1
    : 1
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

module.exports = {
  draw
}