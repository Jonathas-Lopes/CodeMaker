const fs = require('fs');
const path = require('path');
const arquivoFaqs = path.join(__dirname, '../bd/faqs.json');
const categorias = ['Pedidos', 'Pagamento', 'Entrega', 'Trocas', 'Devoluções', 'Outros'];

function lerFaqs() {
    return JSON.parse(fs.readFileSync(arquivoFaqs, 'utf8'));
}
function salvarFaqs(faqs) {
    fs.writeFileSync(arquivoFaqs, JSON.stringify(faqs, null, 2));
}
function getFaqs(req, res) {
    res.render('faq/consulta', { faqs: lerFaqs(), sucesso: req.query.status === 'criada' });
}
function getInserir(req, res) {
    res.render('faq/inserir', { categorias, valores: {}, erro: '' });
}
function postInserir(req, res) {
    // Valide também no servidor: os atributos HTML podem ser contornados.
    const valores = {};
    for (const campo of ['pergunta', 'resposta', 'categoria']) {
        valores[campo] = typeof req.body[campo] === 'string' ? req.body[campo].trim() : '';
    }
    if (!valores.pergunta || valores.pergunta.length > 200 ||
        !valores.resposta || valores.resposta.length > 2000 ||
        !categorias.includes(valores.categoria)) {
        return res.status(400).render('faq/inserir', {
            categorias, valores,
            erro: 'Preencha a pergunta (até 200 caracteres), a resposta (até 2.000 caracteres) e selecione uma categoria válida.'
        });
    }
    const faqs = lerFaqs();
    const id = faqs.length ? Math.max(...faqs.map(faq => faq.id)) + 1 : 1;
    faqs.push({ id, ...valores });
    salvarFaqs(faqs);
    res.redirect('/faq?status=criada');
}
function getExcluir(req, res) {
    const faqs = lerFaqs();
    const selecionada = faqs.find(faq => String(faq.id) === req.query.id);
    const erro = req.query.id !== undefined && !selecionada
        ? 'Dúvida não encontrada. Ela pode já ter sido excluída.' : '';
    res.status(erro ? 404 : 200).render('faq/excluir', {
        faqs, selecionada, erro, sucesso: req.query.status === 'excluida'
    });
}
function postExcluir(req, res) {
    const faqs = lerFaqs();
    const selecionada = faqs.find(faq => String(faq.id) === req.params.id);
    if (!selecionada) {
        return res.status(404).render('faq/excluir', {
            faqs, selecionada: null, sucesso: false,
            erro: 'Dúvida não encontrada. Ela pode já ter sido excluída.'
        });
    }
    // Somente o formulário da etapa de confirmação envia este valor.
    if (req.body.confirmacao !== 'sim') {
        return res.redirect('/faq/excluir?id=' + selecionada.id);
    }
    salvarFaqs(faqs.filter(faq => faq.id !== selecionada.id));
    res.redirect('/faq/excluir?status=excluida');
}
module.exports = { getFaqs, getInserir, postInserir, getExcluir, postExcluir };
