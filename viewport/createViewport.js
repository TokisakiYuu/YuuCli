const readline = require("readline");
const cliCursor = require('cli-cursor');
const MuteStream = require('mute-stream');
const {bindEventModel} = require('./events');
const {draw, clear} = require("./draw");

function createViewport() {
  const interface = createReadlineInterface();
  return initViewprot(interface);
}

function createReadlineInterface() {
  const msStdoout = new MuteStream();
  msStdoout.pipe(process.stdout);
  msStdoout.mute();
  const interface = readline.createInterface({
    input: process.stdin,
    output: msStdoout,
    prompt: '',
    terminal: true
  });
  interface.resume();
  interface.on('SIGINT', () => {
    clear(interface);
    interface.close();
    process.kill(process.pid, 'SIGINT');
  })
  return interface;
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
    this.showCursor = () => cliCursor.show();
    this.hideCursor = () => cliCursor.hide();
  };
  // 隐藏光标
  cliCursor.hide();
  // 程序退出时显示光标
  interface.on("close", () => cliCursor.show());
  // 增加事件模型
  let eventModel = bindEventModel(interface);
  Object.assign(viewport, eventModel);
  // 监听视口大小变化
  process.stdout.on('resize', () => {
    let {columns, rows} = process.stdout;
    viewport.emit('resize', {columns, rows});
  });
  return viewport;
}

module.exports = {
  createViewport
}