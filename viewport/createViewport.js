const readline = require("readline");
const cliCursor = require('cli-cursor');
const MuteStream = require('mute-stream');
const {bindEventModel} = require('./events');
const {draw} = require("./draw");

function createViewport() {
  const interface = createReadlineInterface();
  return initViewprot(interface);
}

function createReadlineInterface() {
  const msStdoout = new MuteStream();
  msStdoout.pipe(process.stdout);
  const rl = readline.createInterface({
    input: process.stdin,
    output: msStdoout,
    prompt: '',
    terminal: true
  });
  rl.resume();
  rl.on('SIGINT', () => {
    rl.close();
    process.kill(process.pid, 'SIGINT');
    console.log('');
  })
  return rl;
}

/**
 * 初始化视口
 * @param {Interface} interface readline interface实例
 */
function initViewprot(interface) {
  const viewport = new function Viewport() {
    this.draw = content => draw(content, interface);
    this.close = () => interface.close();
    this.output = interface.output;
  };
  // 隐藏光标
  cliCursor.hide();
  // 程序退出时显示光标
  interface.on("close", () => cliCursor.show());
  // 增加事件模型
  let eventModel = bindEventModel(interface);
  Object.assign(viewport, eventModel);
  return viewport;
}

module.exports = {
  createViewport
}