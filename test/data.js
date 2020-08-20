const {observable} = require("observer-util-wheel");
module.exports = observable({
  persons: ["ZhangSan", "LiSi", "WangWu"],
  current: 0
});