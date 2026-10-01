const fs = require('fs');
const path = require('path');
const produtos = require('../bd/produtos.json');

function getProdutos(req, res){
  res.render('produtos', { produtos });
}

function novoProduto(req, res){
  res.render('produto-novo', { erros: [], valores: {} });
}

function createProduto(req, res){
  const p = path.join(__dirname, '..', 'bd', 'produtos.json');
  const lista = JSON.parse(fs.readFileSync(p, 'utf8'));
  const novoId = lista.length > 0 ? Math.max(...lista.map(x => x.id)) + 1 : 1;
  lista.push({ id: novoId, nome: req.body.nome, descricao: req.body.descricao, preco: parseFloat(req.body.preco), categoria: req.body.categoria, marca: req.body.marca, fabricante: req.body.fabricante, estoque: parseInt(req.body.estoque), foto: req.body.foto });
  fs.writeFileSync(p, JSON.stringify(lista, null, 2));
  res.redirect('/produtos');
}

function deleteProduto(req, res){
  const p = path.join(__dirname, '..', 'bd', 'produtos.json');
  const lista = JSON.parse(fs.readFileSync(p, 'utf8'));
  const id = parseInt(req.params.id);
  const filtrada = lista.filter(x => x.id !== id);
  fs.writeFileSync(p, JSON.stringify(filtrada, null, 2));
  res.redirect('/produtos');
}

module.exports = { getProdutos, novoProduto, createProduto, deleteProduto };