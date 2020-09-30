const {debug} = require("../index");

const pickerScreen = require("./screens/pickerScreen");
const pickerScreenCn = require("./screens/pickerScreen_cn");

let console = debug.launch();

console.log("hello!");

pickerScreen.update();