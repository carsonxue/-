//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
mongoose.connect("mongodb+srv://Oralten:YyQGqs8aJ5HNwDZj@cluster0.96jh8.mongodb.net/personalWeb?retryWrites=true&w=majority");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema = new mongoose.Schema({
  name: String,
  email: String,
  title: String,
  content: String
});

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/portfolio", function(req, res) {
  res.render("portfolio");
});

app.get("/experience", function(req, res) {
  res.render("experience");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.post("/contact", function(req, res) {
  const post = new Post({
    name: req.body.postName,
    email: req.body.postEmail,
    title: req.body.postTitle,
    content: req.body.postContent
  });

  post.save(function(err){
    if (!err){
      res.redirect("/success");
    }
    else {
      res.redirect("/failure");
    }
  });
});

app.get("/success", function(req, res) {
  res.render("success");
});

app.post("/success", function(req, res) {
  res.redirect("/");
});

app.get("/failure", function(req, res) {
  res.render("failure");
});

app.post("/failure", function(req, res) {
  res.redirect("/contact");
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
