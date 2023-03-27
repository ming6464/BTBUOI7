const express = require("express");
const app = express();
const db = require("mongoose");
const uri =
  "mongodb+srv://giaminh16092003:4xGFYAQIJCQjFgDC@mongotest.hdbc0el.mongodb.net/myDb?retryWrites=true&w=majority";
const model = require("./baiThoModel");
const port = 8099;

app.get("/", async (req, res) => {
  await connectDb();
  let list = await model.find();
  console.log(list);
  res.send(list);
});

app.get("/add", async (req, res) => {
  await connectDb("add");
  let newItem = new model({
    _title: "bài mới",
    _year: 1890,
  });
  newItem._author = "Tác giả mới";
  newItem.save();
  res.redirect("/");
});

app.get("/updateMany", async (req, res) => {
  await connectDb("update Many");
  await model.updateMany({ _year: 1999 }, { _title: "Title new UpdateMany" });
  res.redirect("/");
});

app.get("/update", async (req, res) => {
  await connectDb("update");
  await model.updateOne({ _year: 1973 }, { _title: "Title new UpdateOne" });
  res.redirect("/");
});

app.get("/deleteMany", async (req, res) => {
  await connectDb("delete Many");
  await model.deleteMany({ _year: 1973 });
  res.redirect("/");
});

app.get("/delete", async (req, res) => {
  await connectDb("delete");
  await model.deleteOne({ _year: 1971 });
  res.redirect("/");
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log("Run port " + port);
});

function connectDb(title = "") {
  db.connect(uri).then(console.log(`success ${title} !`));
}
