var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    ejs        = require("ejs"),
    database   = require("./models/database")


mongoose.connect("mongodb://localhost/student_records");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static('public'));

app.get("/",function(req,res){
	res.render("first");
});

// INDEX => show all Database
app.get("/index",function(req,res){
	
	database.find({}, function(err, alldatabase){
		if(err){
			console.log("Oops... something went wrong");
			console.log(err);
		}else{
			res.render("index",{index:alldatabase});
		}
	});	
});

// NEW => show form to create new Database
app.get("/index/new",function(req,res){
	res.render("new");
});

//SHOW =>show more info
app.get("/index/:id", function(req,res){
    database.findById(req.params.id, function(err,moreinfo){
        if(err){
            console.log(err);
        }else{
            res.render("info", {database:moreinfo});

        }   
        });
    });
    
// CREATE => add new records to Database
app.post("/database",function(req,res){

	var name = req.body.name;
	var age = req.body.age;
	var dob = req.body.dob;
	var degree = req.body.degree;
	var newdatabase = {name: name, age: age, dob: dob, degree: degree}
	database.create(newdatabase, function(err,newlycreated){
		if(err){
			console.log("Oops... something went wrong");
			console.log(err);
		}else{
			console.log("Newly created: ")
			res.redirect("/index");
		}
	});
});

// START SERVER
app.listen(1234,function(){
	console.log("*****SERVER STARTS*****");
	
});

