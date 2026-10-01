const fs = require('fs');
const path = require('path');

const PRODUTOS_PATH = path.join(__dirname, '..', 'bd', 'produtos.json');

function validarProduto(req, res, next) {
  const { nome, descricao, preco, categoria, marca, fabricante, estoque, foto } = req.body;

  const erros = [];

  if (!nome || nome.trim() === '') erros.push('Nome é obrigatório');
  if (!descricao || descricao.trim() === '') erros.push('Descrição é obrigatória');
  if (!preco || isNaN(preco)) erros.push('Preço deve ser um número válido');
  if (!categoria || categoria.trim() === '') erros.push('Categoria é obrigatória');
  if (!marca || marca.trim() === '') erros.push('Marca é obrigatória');
  if (!fabricante || fabricante.trim() === '') erros.push('Fabricante é obrigatório');
  if (!estoque || isNaN(estoque)) erros.push('Estoque deve ser um número válido');
  if (!foto || foto.trim() === '') erros.push('Foto é obrigatória');

  if (erros.length > 0) {
    return res.render('produto-novo', { erros, valores: req.body });
  }

  next();
}

module.exports = { validarProduto };