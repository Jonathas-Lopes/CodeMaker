const categorias = require('../bd/categorias.json');

function getCategorias(req, res){
  res.render('categorias', { categorias });
};

module.exports = {
  getCategorias
};  