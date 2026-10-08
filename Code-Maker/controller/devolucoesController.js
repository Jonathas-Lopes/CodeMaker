const fs = require('fs').promises;
const path = require('path');
const bdPath = path.join(__dirname, '../bd/devolucoes.json');

const mensagens = {
    salvo: { classe: 'success', texto: 'Solicitação registrada com sucesso.' },
    excluido: { classe: 'success', texto: 'Solicitação excluída com sucesso.' },
    naoencontrado: { classe: 'warning', texto: 'Solicitação não encontrada.' }
};

const lerDevolucoes = async () => {
    const dados = await fs.readFile(bdPath, 'utf-8');
    return JSON.parse(dados);
};

const gravarDevolucoes = async (devolucoes) => {
    await fs.writeFile(bdPath, JSON.stringify(devolucoes, null, 2));
};

const dataDeHoje = () => {
    const hoje = new Date();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return `${hoje.getFullYear()}-${mes}-${dia}`;
};

const listar = async (req, res, next) => {
    try {
        const devolucoes = await lerDevolucoes();
        const mensagem = mensagens[req.query.msg] || null;
        res.render('devolucoes/index', { devolucoes, mensagem });
    } catch (erro) {
        next(erro);
    }
};

const exibirFormulario = (req, res) => {
    res.render('devolucoes/novo', { erro: null, dados: {} });
};

const salvar = async (req, res, next) => {
    try {
        const { pedido, cliente, produto, tipo, motivo } = req.body;
        const devolucoes = await lerDevolucoes();

        const novoId = devolucoes.length > 0 ? Math.max(...devolucoes.map(d => d.id)) + 1 : 1;

        devolucoes.push({
            id: novoId,
            pedido: pedido.trim(),
            cliente: cliente.trim(),
            produto: produto.trim(),
            tipo,
            motivo: motivo.trim(),
            status: 'Em análise',
            data: dataDeHoje()
        });
        await gravarDevolucoes(devolucoes);
        res.redirect('/devolucoes?msg=salvo');
    } catch (erro) {
        next(erro);
    }
};

const excluir = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const devolucoes = await lerDevolucoes();
        const restantes = devolucoes.filter(d => d.id !== id);

        if (restantes.length === devolucoes.length) {
            return res.redirect('/devolucoes?msg=naoencontrado');
        }

        await gravarDevolucoes(restantes);
        res.redirect('/devolucoes?msg=excluido');
    } catch (erro) {
        next(erro);
    }
};

module.exports = { listar, exibirFormulario, salvar, excluir };
