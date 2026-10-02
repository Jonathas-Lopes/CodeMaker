const itens = require('../bd/itens.json');

function getItens(req, res){
  res.render('itens', { itens });
};

module.exports = {
  getItens
};  