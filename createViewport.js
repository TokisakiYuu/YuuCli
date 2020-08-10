const readline = require('readline');
const cliCursor = require('cli-cursor');

function createViewport() {
  const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '',
    terminal: true
  });
  initViewprot(interface);
  return interface;
}

/**
 * 初始化视口
 * @param {Interface} interface readline interface实例
 */
function initViewprot(interface) {
  // 隐藏光标
  cliCursor.hide();
  // 程序退出时显示光标
  interface.on("close", () => cliCursor.show());
  // 阻止按键默认事件
  interface.input.on("keypress", (a,b,c) => {
    console.log(a,b,c);
    return false;
  });
}

module.exports = {
  createViewport
}