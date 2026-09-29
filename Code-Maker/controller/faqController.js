const fs = require('fs').promises;
const path = require('path');
const bdPath = path.join(__dirname, '../bd/faq.json');

const listar = async (req, res) => {
    const dados = await fs.readFile(bdPath, 'utf-8');
    const faqs = JSON.parse(dados);
    res.render('faq/index', { faqs });
};

const exibirFormulario = (req, res) => {
    res.render('faq/novo');
};

const salvar = async (req, res) => {
    const { pergunta, resposta } = req.body;
    const dados = await fs.readFile(bdPath, 'utf-8');
    const faqs = JSON.parse(dados);
    
    const novoId = faqs.length > 0 ? Math.max(...faqs.map(f => f.id)) + 1 : 1;

    faqs.push({ id: novoId, pergunta, resposta });
    await fs.writeFile(bdPath, JSON.stringify(faqs, null, 2));
    res.redirect('/faq');
};

const excluir = async (req, res) => {
    const id = parseInt(req.params.id);
    const dados = await fs.readFile(bdPath, 'utf-8');
    let faqs = JSON.parse(dados);

    faqs = faqs.filter(f => f.id !== id);
    await fs.writeFile(bdPath, JSON.stringify(faqs, null, 2));
    res.redirect('/faq'); 
};

module.exports = { listar, exibirFormulario, salvar, excluir };