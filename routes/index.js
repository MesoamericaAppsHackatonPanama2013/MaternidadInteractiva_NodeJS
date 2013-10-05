var provider = require('../RegistryProvider')

/*
 * GET home page.
 */

exports.index = function(req, res){
	provider.getAll(function(err, items){
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

	provider.insert(function(err, result) {

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
	}, nuevoregistro);
}


/* 
* GET: Delete all the data on the database
*/

exports.eraseDatabase = function(req, res){
	provider.drop(function(err, data){
		exports.index(req, res);
	});
}


/*
 * POST: Alarma desde el servidor Android.
 */

exports.alarma = function(req, res){
	id = req.body.id;
	source = req.body.phone;

	var response = {
		message: "No hay Identificador",
		name: ""
	};

	if (id){
		if (Buffer.byteLength(id, 'utf8') != 24){
			response.message = "ID debe ser de 24 dígitos";
			res.json(response);
		} else {
			provider.getOne(function(err, registro){
				if (!registro){
					response.message = "Identificador Incorrecto";
				} else {
					response.message = "OK";
					response.name = registro.name;

					var mailer = require('../Mailer');
					mailer.sendMail("zubieta.roberto.e@gmail.com", registro, source);
				}

				res.json(response);

			}, id);
		}
	} else {
		res.json(response);
	}
}
