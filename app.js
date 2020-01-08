var express = require("express");
var bodyParser = require("body-parser");
var date= require(__dirname +"/date.js");

let items = [];
let workItems = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {

  let day = date.getDate();
  res.render("list", {listTitle: day, newListitems: items});

});

app.post("/", function(req, res) {

  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work")
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newListitems: workItems});
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function(req, res) {
  res.render("about")
});



app.listen(process.env.PORT || 3000, function() {
  console.log("server running on port 3000");
});
