//require the modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

//basic set-up
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//connecting to mongoose database
mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser:true,useUnifiedTopology:true});

//new schema for the post
const postSchema = new mongoose.Schema({
  title:String,
  content:String
});

const Post = mongoose.model("Post",postSchema);

//get request for the home route
app.get("/",function(req,res){
  Post.find(function(err,posts){
    if(err){
      console.log(err);
    }else{
      res.render('home',{         //rendering the homepage

        posts:posts               //providing with all the posts
      });
    }
  });

});

//get route for contact page
app.get("/contact",function(req,res){
  res.render('contact')
});

//get route for about page
app.get("/about",function(req,res){
  res.render('about')
});

//get route for compose page
app.get("/compose",function(req,res){
  res.render('Compose');
});

//post route for compose page
app.post("/compose",function(req,res){
  //making a new post object using the postSchema
  const post = new Post ({
    title : req.body.postTitle,           //title of blog using bodyParser
    content : req.body.postContent        //content of blog using bodyParser
  });
  post.save();

  res.redirect("/");
});

//get request for custom route for each blog
app.get("/posts/:postId",function(req,res){
  const requestedPostId = req.params.postId;

  //finding the post clicked using the post id
  Post.findOne({_id: requestedPostId}, function(err, post){
    if(err){
      console.log(err);
    }else{
        res.render("post",{
          blogTitle:post.title,
          blogContent:post.content
        });
      }
    });
});

//listen request for port 3000
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
