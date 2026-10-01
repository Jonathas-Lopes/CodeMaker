const fs = require('fs').promises;
const path = require('path');

const PRODUTOS_PATH = path.join(__dirname, '..', 'bd', 'produtos.json');

async function lerProdutos() {
  const data = await fs.readFile(PRODUTOS_PATH, 'utf8');
  return JSON.parse(data);
}

async function escreverProdutos(produtos) {
  await fs.writeFile(PRODUTOS_PATH, JSON.stringify(produtos, null, 2), 'utf8');
}

async function getProdutos(req, res) {
  const produtos = await lerProdutos();
  res.render('produtos', { produtos });
}

async function novoProduto(req, res) {
  res.render('produto-novo', { erros: [], valores: {} });
}

async function createProduto(req, res) {
  try {
    const produtos = await lerProdutos();
    const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;

    const novoProduto = {
      id: novoId,
      nome: req.body.nome,
      descricao: req.body.descricao,
      preco: parseFloat(req.body.preco),
      categoria: req.body.categoria,
      marca: req.body.marca,
      fabricante: req.body.fabricante,
      estoque: parseInt(req.body.estoque),
      foto: req.body.foto
    };

    produtos.push(novoProduto);
    await escreverProdutos(produtos);
    res.redirect('/produtos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao salvar produto');
  }
}

async function deleteProduto(req, res) {
  try {
    const id = parseInt(req.params.id);
    let produtos = await lerProdutos();
    produtos = produtos.filter(p => p.id !== id);
    await escreverProdutos(produtos);
    res.redirect('/produtos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao excluir produto');
  }
}

module.exports = {
  getProdutos,
  novoProduto,
  createProduto,
  deleteProduto
};