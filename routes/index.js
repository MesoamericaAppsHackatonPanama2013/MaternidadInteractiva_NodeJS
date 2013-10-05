var mongo = require('mongoskin');

var collection = 'registros';
var connectionString = "mongodb://nodejitsu_zubietaroberto:u63hfuu4171tlarho02sk0lic4@ds045998.mongolab.com:45998/nodejitsu_zubietaroberto_nodejitsudb2956975598";
var BSON = mongo.BSONPure;


function getDatabase(){
	return mongo.db(connectionString, {safe:'true'}).collection(collection);
}

/*
 * GET home page.
 */

exports.index = function(req, res){
	getDatabase().find().toArray(function (err, items) {
  		console.dir(items);
		res.render('index', { title: 'Índice' });
	});
};


/*
* GET: New Registry
*/

exports.nuevo = function(req, res){
  res.render('nuevo', { title: 'Nuevo Registro' });
};


/*
* POST: process the data from the "Nuevo" page
*/
exports.insertar = function(req, res){
	debugger;

	var hr = false;
	if (req.body.is_high_risk){
		hr = true;
	}

	var nuevoregistro = {
		name: req.body.name,
		phone: req.body.phone1,
		conception: req.body.weeks,
		comment: req.body.comments,
		high_risk: hr
	};

	getDatabase().insert(nuevoregistro, function(err, result) {
		debugger;

		var id = 'Sin Respuesta';
		if (err){
			 id = err;
			 console.log(err);
		}

		if(result){
			id = JSON.stringify(result);
	    	console.log(result);
		}

		res.render('codigo', {title: 'Identificador', identificador: id});
	});
}


/* 
* GET: Delete all the data on the database
*/

exports.eraseDatabase = function(req, res){
	getDatabase().drop(function(err, data){
		exports.index(req, res);
	});
}

exports.alarma = function(req, res){
	id = req.body.id;
	source = req.body.phone;

	var response = {
		success: false,
		message: "No hay Identificador",
		name: ""
	};

	if (id){
		if (Buffer.byteLength(id, 'utf8') != 12){
			response.message = "ID debe ser de 12 dígitos";
			res.json(response);
		} else {
			getDatabase().findOne({_id: new BSON.ObjectID(id)}, function(err, registro){

				if (!registro){
					response.message = "Identificador Incorrecto";
				} else {
					response.success = true;
					response.message = "OK";
					response.name = registro.name;
				}

				res.json(response);
			});

		}
	} else {
		res.json(response);
	}
}
