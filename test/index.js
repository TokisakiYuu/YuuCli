/**
 * 第二版ui框架，参考react
 */

const {creatScreen} = require("../ui_v2/ui");
const List = require("./components/list");
const Tip = require("./components/tip");


const pickerScreen = creatScreen({
  components: [List, Tip],
  data: {
    persons: ["ZhangSan", "LiSi", "WangWu"],
    current: 0
  }
});

// console.log(pickerScreen);

pickerScreen.update();