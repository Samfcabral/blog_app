/* 
  require the usual modules
*/
var express = require("express"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  pg = require("pg");
  app = express();

var db = require("./models");

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
//End of usual stuff


//Start of routing
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/authors", function (req, res) {
	db.author.findAll()
	.then(function(author) {
		res.render("authors/index", {authorsList: authors});		
	})
});

app.post("/authors", function (req, res) {
    db.author.create({
        firstName: req.body.author.firstName,
        lastName: req.body.author.lastName,
        age: req.body.age
    }).then(function (newAuthor) {
        res.redirect("/authors/" + newAuthor.id);
    });
});

app.get("/authors/:id", function (req, res) {
    // we need to find the author by the id.
    var id = req.params.id;
    db.author.find({
        where: {id: id},
        include: [db.post]
    })
    .then(function (foundAuthor) {
        res.render("authors/show", {author: foundAuthor});
    });
});

app.get("/authors/new", function (req, res) {
  res.render("authors/new");
});

app.get("/authors/:id/edit", function (req, res) {
	db.author.find(req.params.id)
	.then(function (author) {
		res.render("author/edit", {author: author});
	});
});

app.put("/authors/:id", function (req, res) {
	db.author.find(req.params.id)
		.then(function (author) {
			console.log(author);
			author.updateAttributes({
				title: req.body.author.title,
				content: req.body.author.content,
				author: req.body.author.author
			})
			.then(function (author) {
				res.redirect("/authors/" + author.id);
			})
		})
});

app.get("/posts", function (req, res) {
  db.post.findAll().then(function(posts){
    res.render("posts/index"), {postList: posts};
  })
});

app.post("/posts",  function (req, res) {
  db.post.create({
    title: req.body.post.title,
    content: req.body.post.content
  })
  console.log(req.body.post);
  res.redirect("/posts");
});

app.get("/posts/new", function(req, res){ 
  res.render("posts/new");
});


app.get("/posts/:id", function(req, res) {
  db.post.find(req.params.id)
  .then(function(posts) {
    res.render("posts/show", {postsList: post});
  })
});



db.sequelize.sync().then(function() {
  var server = app.listen(3000, function() {
    console.log(new Array(51).join("*"));
    console.log("\t LISTENING ON: \n\t\t localhost:3000");
    console.log(new Array(51).join("*")); 
  });
});