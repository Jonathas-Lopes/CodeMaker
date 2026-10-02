function validarChamado(req, res, next) {
    const { erro, descricao, status, data } = req.body;

    if (
        !erro?.trim() ||
        !descricao?.trim() ||
        !status?.trim() ||
        !data?.trim()
    ) {
        return res.status(400).send('Preencha todos os campos obrigatórios.');
    }

    next();
}

module.exports = validarChamado;