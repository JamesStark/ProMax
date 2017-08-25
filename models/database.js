var mongoose = require("mongoose");

var databaseSchema = new mongoose.Schema({
	name: String,
	age: String,
	dob: String,
	degree: String
});

module.exports = mongoose.model("database",databaseSchema);