const dotenv = require("dotenv")
const express = require("express");
const bodyParser = require("body-parser");
const https=require("https");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _=require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//var posts=[];
dotenv.config()
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//mongoose.connect('mongodb://localhost:27017/testblog', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true});


const blogSchema = {title: String, desc:String};
const Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res){
  Blog.find({}, function(err, posts){
    res.render("home",{homeStartingContent:homeStartingContent,posts:posts});
  });
});

app.get("/about", function(req, res){res.render("about",{aboutContent:aboutContent});});
app.get("/contact", function(req, res){res.render("contact_news");});
app.get("/compose", function(req, res){ res.render("compose");});

app.get("/posts/:postId",function(req,res){
   const requestedPostId = req.params.postId;
  Blog.findOne({_id:requestedPostId},function(err,posts){
  res.render("post",{title:posts.title,desc:posts.desc});
  });
});

app.post("/compose",function(req,res){
  const blog = new Blog({title:_.capitalize(req.body.comptitle),desc:req.body.compdesc});
  blog.save(function(err){
    if (!err){res.redirect("/");}
  });
});
app.post("/contact",function(req,res){
  console.log(req.body);
  res.redirect("/");
});

let port = process.env.PORT;
if (port == null || port == "") {port = 3001;}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
