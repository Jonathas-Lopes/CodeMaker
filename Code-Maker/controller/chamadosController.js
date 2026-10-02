const fs = require('fs').promises;
const path = require('path');

const caminhoArquivo = path.join(__dirname, '../bd/chamados.json');

async function getChamados(req, res) {
    const dados = await fs.readFile(caminhoArquivo, 'utf8');
    const chamados = JSON.parse(dados);

    res.render('chamados', {
        chamados,
        mensagem: req.query.mensagem
    });
}

async function getNovoChamado(req, res) {
    res.render('novoChamado');
}

async function salvarChamado(req, res) {
    const dados = await fs.readFile(caminhoArquivo, 'utf8');
    const chamados = JSON.parse(dados);

    const novoChamado = {
        id: chamados.length + 1,
        erro: req.body.erro,
        descricao: req.body.descricao,
        status: req.body.status,
        data: req.body.data
    };

    chamados.push(novoChamado);

    await fs.writeFile(
        caminhoArquivo,
        JSON.stringify(chamados, null, 2)
    );

    res.redirect('/chamados');
}

async function excluirChamado(req, res) {
    const dados = await fs.readFile(caminhoArquivo, 'utf8');
    const chamados = JSON.parse(dados);

    const id = Number(req.params.id);

    const novosChamados = chamados.filter(
        chamado => chamado.id !== id
    );

    await fs.writeFile(
        caminhoArquivo,
        JSON.stringify(novosChamados, null, 2)
    );

    res.redirect(
        '/chamados?mensagem=Chamado%20excluido%20com%20sucesso'
    );
}

module.exports = {
    getChamados,
    getNovoChamado,
    salvarChamado,
    excluirChamado
};