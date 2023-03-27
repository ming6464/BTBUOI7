const db = require("mongoose");
const schema = new db.Schema({
  _title: {
    type: String,
    require: true,
  },
  _year: {
    type: Number,
    default: 1900,
  },
  _author: {
    type: String,
  },
});
const model = new db.model("baitho", schema);
module.exports = model;
