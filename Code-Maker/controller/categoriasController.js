const fs = require('fs');
const categorias = require('../bd/categorias.json');


function getCategorias(req, res){
  res.render('categorias', { categorias });
};
function getNovo(req, res) {
    res.render('novo', {});
}
async function postSalvar(req, res) {
    const foto = req.body.foto;
    const nome = req.body.nome;
    const ids = categorias.map(categoria => categoria.id);
    const novacategoria = {
        foto,
        nome,
        id: Math.max(...ids) + 1
        
    };
    categorias.push(novacategoria);
    await fs.promises.writeFile('./bd/categorias.json', JSON.stringify(categorias,null, 2));
    res.redirect('/categorias');
}

module.exports = {
  getCategorias,
  getNovo,
  postSalvar
}; 



