const viewport = require("../viewport");
const Screen = require("./class/Screen");

function row(string) {
  return string.replace(/\n/g, "") + "\n";
}

function space(sum) {
  if(sum <= 0) return "";
  return " " + space(sum - 1);
}

function creatScreen(options) {
  return new Screen(options);
}

function useKeypressEvent(fn) {
  viewport.on("keypress", fn);
}

module.exports = {
  row,
  space,
  creatScreen,
  Screen,
  useKeypressEvent
}