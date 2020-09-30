const {row, space} = require("../../ui");

function tip(data) {
  return row("请选择列表中的一项(空格键确定)");
}

module.exports = tip;