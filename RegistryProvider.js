var mongo = require('mongoskin');

var collection = 'registros';
var connectionString = "";

function getDatabase(){
	return mongo.db(connectionString, {safe:'true'}).collection(collection);
}

exports.BSON = mongo.BSONPure;

exports.getAll = function(callback){
	getDatabase().find().toArray(function (err, items) {
		if (err) callback(err);
		else callback(null, items);
	});
}

exports.insert = function(callback, nuevoregistro){
	getDatabase().insert(nuevoregistro, function(err, item){
		if (err) callback(err);
		else callback(null, item);
	});
}

exports.getOne = function(callback, BinaryId){
	getDatabase().findOne({_id: new this.BSON.ObjectID(id)}, function(err, registry){
		if (err) callback(err);
		else callback(null, registry);
	});
}

exports.drop = function(callback){
	getDatabase().drop(function(err, data){
		if (err) callback(err);
		else callback(null, data);
	});
}