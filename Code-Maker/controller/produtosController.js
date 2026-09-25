const produtos = require('../bd/produtos.json');

function createProduto(req, res){
  
    

function getProdutos(req, res){
  res.render('produtos', { produtos });
};

module.exports = {
  getProdutos
};