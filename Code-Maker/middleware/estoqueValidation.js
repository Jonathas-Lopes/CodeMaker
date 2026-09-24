function validarEstoque(req, res, next) {
  const { produto, variacao, quantidade } = req.body;
  const produtoNormalizado = typeof produto === 'string' ? produto.trim() : '';
  const variacaoNormalizada = typeof variacao === 'string' ? variacao.trim() : '';

  if (!produtoNormalizado) {
    return res.status(400).send('O campo produto é obrigatório.');
  }

  if (produtoNormalizado.length > 100) {
    return res.status(400).send('O produto deve ter no máximo 100 caracteres.');
  }

  if (!variacaoNormalizada) {
    return res.status(400).send('O campo variação é obrigatório.');
  }

  if (variacaoNormalizada.length > 100) {
    return res.status(400).send('A variação deve ter no máximo 100 caracteres.');
  }

  const quantidadeNumerica = Number(quantidade);

  if (quantidade === undefined || quantidade === null || quantidade === '' || !Number.isFinite(quantidadeNumerica) || !Number.isInteger(quantidadeNumerica) || quantidadeNumerica < 0) {
    return res.status(400).send('A quantidade deve ser um número inteiro maior ou igual a zero.');
  }

  req.body.produto = produtoNormalizado;
  req.body.variacao = variacaoNormalizada;
  req.body.quantidade = quantidadeNumerica;
  next();
}

module.exports = validarEstoque;
