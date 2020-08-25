const { Interface } = require("readline");

const Keypress = "keypress";
const Line = "line";
const Close = "close";
const Data = "data";

/**
 * 绑定事件模型
 * @param {Interface} interface readline interface实例
 */
function bindEventModel(interface) {
  let store = {};
  interface.input.on(Keypress, 
    (code, desc) => emit(Keypress, {code, desc}, store));
  interface.on(Line, 
    content => emit(Line, content, store));
  interface.on(Close, 
    () => emit(Close, undefined, store));
  interface.output.on(Data, 
    content => emit(Data, content, store));
  return {
    on:   (name, handler) => on(name, handler, store),
    once: (name, handler) => once(name, handler, store),
    rm:   (name, handler) => rm(name, handler, store),
    emit: (name, data)    => emit(name, data, store),
    removeAllEventHandler: () => Object.keys(store).forEach(key => Reflect.deleteProperty(store, key))
  }
}


/**
 * 绑定事件处理函数
 * @param {String} name 事件名
 * @param {Function} handler 处理函数
 * @param {Object} store 处理函数存储库
 */
function on(name, handler, store) {
  if(!store[name]) {
    store[name] = [];
  }
  let handlers = store[name];
  handlers.push(handler);
}

/**
 * 移除事件处理函数
 * @param {String} name 事件名
 * @param {Function} handler 处理函数
 * @param {Object} store 处理函数存储库
 */
function rm(name, handler, store) {
  if(!store[name]) return;
  let handlers = store[name];
  handlers = handlers.filter(h => h !== handler);
}

/**
 * 绑定事件处理函数，只触发一次
 * @param {String} name 事件名
 * @param {Function} handler 处理函数
 * @param {Object} store 处理函数存储库
 */
function once(name, handler, store) {
  function tmpHandler() {
    handler.apply(null, arguments);
    rm(name, tmpHandler, store);
  }
  on(name, tmpHandler, store)
}

function emit(name, data, store) {
  if(!store[name]) return;
  let handlers = store[name];
  handlers.map(handler => {
    handler(data);
  })
}

module.exports = {
  bindEventModel
}