const estoque= require('../bd/estoque.json');

function getEstoque(req, res){
  res.render('estoque', { estoque });
};

module.exports = {
  getEstoque
};  