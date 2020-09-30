const {creatScreen} = require("../../index");
const List = require("../components/list");
const Tip = require("../components/tip");


module.exports = creatScreen({
  name: "pickerScreen",
  components: [List, Tip],
  data: {
    persons: ["ZhangSan", "LiSi", "WangWu"],
    current: 0
  }
});