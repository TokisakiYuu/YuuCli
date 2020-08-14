const ansiEscapes = require('ansi-escapes');

// 视口内容的总行数，随内容动态增减
let viewportLines = 1;


/**
 * 绘制帧
 * @param {String} content 内容
 * @param {*} interface 
 */
function draw(content = "", interface) {
  if(typeof content !== 'string') {
    content = String(content);
  }
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

module.exports = {
  draw
}