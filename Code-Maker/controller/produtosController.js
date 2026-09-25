const produtos = require('../bd/produtos.json');

   

function getProdutos(req, res){
  res.render('produtos', { produtos });
};

module.exports = {
  getProdutos
};