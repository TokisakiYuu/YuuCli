let {observe} = require('observer-util-wheel');
const viewport = require('../viewport');


let currentScreen = null;
/**
 * 更新屏幕内容
 */
function updateToScreen(screen) {
  currentScreen = screen;
  viewport.draw(screen.getRenderResult());
}

function registerScreen(screen) {

}

function isHidden(screen) {
  return currentScreen === screen;
}

module.exports = {
  registerScreen,
  updateToScreen,
  isHidden
}