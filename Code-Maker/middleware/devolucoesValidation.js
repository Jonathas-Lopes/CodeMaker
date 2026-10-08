const tiposValidos = ['Troca', 'Devolução'];

module.exports = (req, res, next) => {
    const { pedido, cliente, produto, tipo, motivo } = req.body;
    const obrigatorios = [pedido, cliente, produto, tipo, motivo];
    const temCampoVazio = obrigatorios.some(campo => !campo || !campo.trim());

    let erro = null;
    if (temCampoVazio) {
        erro = 'Todos os campos são obrigatórios.';
    } else if (!tiposValidos.includes(tipo)) {
        erro = 'O tipo da solicitação deve ser Troca ou Devolução.';
    }

    if (erro) {
        return res.status(400).render('devolucoes/novo', { erro, dados: req.body });
    }
    next();
};
