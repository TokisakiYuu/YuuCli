const viewport = require('../viewport');

// Screen store
// name  =>  Screen 
const allScreen = new Map();

let currentScreen = null;
/**
 * 更新屏幕内容
 */
function updateToScreen(screen) {
  if(currentScreen !== screen) return;
  viewport.draw(screen.getRenderResult());
}

function registerScreen(screen) {
  allScreen.set(screen.name, allScreen);
}

function showScreen(name) {
  if(!allScreen.has(name)) {
    console.warn(`the Screen of name is '${name}' not found`);
    return;
  }
  return currentScreen = allScreen.get(name);
}

module.exports = {
  registerScreen,
  updateToScreen,
  showScreen
}