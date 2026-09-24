const metodosAlteracao = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function validarOrigem(req, res, next) {
  if (!metodosAlteracao.has(req.method)) {
    return next();
  }

  const origem = req.get('origin');
  const referer = req.get('referer');
  const origemEsperada = `${req.protocol}://${req.get('host')}`;

  if (origem && origem !== origemEsperada) {
    return res.status(403).send('Origem da requisição não permitida.');
  }

  if (referer && !referer.startsWith(`${origemEsperada}/`)) {
    return res.status(403).send('Origem da requisição não permitida.');
  }

  next();
}

module.exports = validarOrigem;