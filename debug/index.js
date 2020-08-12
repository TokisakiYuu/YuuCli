const {Worker} = require('worker_threads');
const colors = require('colors');

const worker = new Worker(__dirname + "/debugShell.js");
let workerAlive = true;

function onWorkerExit() {
  workerAlive = false;
}
worker.on("error", onWorkerExit);
worker.on("exit", onWorkerExit);

/**
 * 需要传入一个可序列化的对象
 * @param {any} json 
 */
function log(json) {
  if(workerAlive) {
    worker.postMessage(JSON.stringify(json));
  } else {
    console.warn(colors.red("Has lost connection with Debug terminal"));
  }
}

module.exports = {
  log
};