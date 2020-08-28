const viewport = require("../viewport");
const Screen = require("./class/Screen");

const screens = new Map();

function row(string) {
  return string.replace(/\n/g, "") + "\n";
}

function space(sum) {
  if(sum <= 0) return "";
  return " " + space(sum - 1);
}

function creatScreen(options) {
  let screen = new Screen(options);
  if(options.name) {
    screens.set(options.name, screen);
  }
  return screen;
}

function useKeypressEvent(fn) {
  viewport.on("keypress", fn);
}

function gotoScreen(name) {
  if(!screens.has(name)) return;
  let screen = screens.get(name);
  screen.update();
}

module.exports = {
  row,
  space,
  creatScreen,
  Screen,
  useKeypressEvent,
  gotoScreen
}