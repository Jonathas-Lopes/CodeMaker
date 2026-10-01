const camposObrigatorios = ['pedido', 'cliente', 'produto', 'tipo', 'motivo'];
const tiposPermitidos = ['Troca', 'Devolução'];

function validarTroca(req, res, next) {
  const camposVazios = camposObrigatorios.filter(campo =>
    typeof req.body[campo] !== 'string' || req.body[campo].trim() === ''
  );

  if (camposVazios.length > 0 || !tiposPermitidos.includes(req.body.tipo)) {
    return res.status(400).render('trocas/nova', {
      erro: 'Preencha todos os campos e selecione um tipo válido para a solicitação.',
      valores: req.body
    });
  }

  next();
}

module.exports = validarTroca;
