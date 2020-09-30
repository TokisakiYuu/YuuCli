const {row, space} = require("../../ui");

function tip(data) {
  return row("please pick one of list (press space to accept)");
}

module.exports = tip;