let ui = require('./ui');

let current = 0;
let arr = [];

let pickerScreen = new ui.Screen("pickerScreen");

pickerScreen
    .lines(arr, (elem, index) => {
        return (current === index ? "->" : ui.space(4)) + elem
    })
    ._("请选择一个:")

pickerScreen.on("kepress:return", () => {});
