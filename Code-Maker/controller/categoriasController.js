const fs = require('fs');
const categorias = require('../bd/categorias.json');


function getCategorias(req, res){
  res.render('categorias', { categorias });
};
function getNovo(req, res) {
    res.render('novo', {});
}
async function postExcluir(req, res) {
    const id = req.params.id;
    const indice = categorias.findIndex(categoria => categoria.id == id); 
    categorias.splice(indice, 1);
    await fs.promises.writeFile('./bd/categorias.json', JSON.stringify(categorias, null, 2));
    res.redirect('/categorias');
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
  postSalvar,
  postExcluir
  
}; 



