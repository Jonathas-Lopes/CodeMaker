const produtotos = require('../bd/produtos.json');

function getprodutos(req, res){
  res.render('produtos', { produtotos });
};

module.exports = {
  getprodutos
};  