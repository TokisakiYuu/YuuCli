const {observable} = require('observer-util-wheel');

function dataModel(object) {
  return observable(object);
}

module.exports = {
  dataModel
}