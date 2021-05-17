const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser:true,useUnifiedTopology:true});

const postSchema = new mongoose.Schema({
  title:String,
  content:String
});

const Post = mongoose.model("Post",postSchema);

app.get("/",function(req,res){
  Post.find(function(err,posts){
    if(err){
      console.log(err);
    }else{
      res.render('home',{

        posts:posts
      });
    }
  });

});

app.get("/contact",function(req,res){
  res.render('contact')
});

app.get("/about",function(req,res){
  res.render('about')
});

app.get("/compose",function(req,res){
  res.render('Compose');
});
app.post("/compose",function(req,res){
  const post = new Post ({
    title : req.body.postTitle,
    content : req.body.postContent
  });
  post.save();
  
  res.redirect("/");
});

app.get("/posts/:postName",function(req,res){
  const requestedTitle = req.params.postName;

  posts.forEach(function (post){
    const storedTitle = post.title;

    if (_.lowerCase(storedTitle) === _.lowerCase(requestedTitle)){
      res.render("post",{
        blogTitle:post.title,
        blogContent:post.content
      });
    }
  });
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
