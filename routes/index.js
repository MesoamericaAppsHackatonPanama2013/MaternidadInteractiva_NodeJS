/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Índice' });
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
	console.log(req.body.name);
	console.log(req.body.phone1);
	console.log(req.body.weeks);
	console.log(req.body.comments);
	console.log(req.body.is_high_risk);
	res.render('codigo', {title: 'Identificador'});
}