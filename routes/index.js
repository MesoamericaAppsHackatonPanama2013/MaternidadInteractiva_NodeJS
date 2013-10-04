
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