const {creatScreen} = require("../../index");
const List = require("../components/list_cn");
const Tip = require("../components/tip_cn");


module.exports = creatScreen({
  name: "pickerScreen_cn",
  components: [List, Tip],
  data: {
    persons: ["张三", "李四", "王五"],
    current: 0
  }
});