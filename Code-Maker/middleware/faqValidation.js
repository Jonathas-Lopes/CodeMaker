module.exports = (req, res, next) => {
    const { pergunta, resposta } = req.body;
    if (!pergunta || !resposta) {
        return res.status(400).send("Os campos Pergunta e Resposta são obrigatórios.");
    }
    next();
};