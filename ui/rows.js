class Rows {
  constructor() {}
  _rows = [];

  addRow(string) {
    this._rows.push(string.replace(/\n/g, "") + "\n");
  }

  toString() {
    return this._rows.join("");
  }
}

module.exports = Rows;