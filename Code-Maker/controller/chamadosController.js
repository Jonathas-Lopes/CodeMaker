const chamados = require('../bd/chamados.json');

function getChamados(req, res){
  res.render('chamados', { chamados });
};

module.exports = {
  getChamados
};  