let launched = false;
let moduleExports = null;

function launch() {
  if(launched) return moduleExports;
  launched = true;
  moduleExports = require('./debugShell');
  return moduleExports;
}
module.exports = {launch};