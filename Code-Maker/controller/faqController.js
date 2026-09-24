const fs = require('fs');
const path = require('path');

const arquivoFaqs = path.join(__dirname, '../bd/faqs.json');

function lerFaqs() {
    const dados = fs.readFileSync(arquivoFaqs, 'utf8');

    return JSON.parse(dados);
}

function salvarFaqs(faqs) {
    fs.writeFileSync(
        arquivoFaqs,
        JSON.stringify(faqs, null, 2)
    );
}


// CONSULTAR
function getFaqs(req, res) {

    const faqs = lerFaqs();

    res.render('faq/consulta', {
        faqs
    });
}


// MOSTRAR FORMULÁRIO
function getInserir(req, res) {

    res.render('faq/inserir');

}


// INSERIR FAQ
function postInserir(req, res) {

    const {
        pergunta,
        resposta,
        categoria
    } = req.body;

    const faqs = lerFaqs();

    const novoId =
        faqs.length > 0
            ? Math.max(...faqs.map(faq => faq.id)) + 1
            : 1;

    const novaFaq = {
        id: novoId,
        pergunta,
        resposta,
        categoria
    };

    faqs.push(novaFaq);

    salvarFaqs(faqs);

    res.redirect('/faq');
}

function getExcluir(req, res) {

    const faqs = lerFaqs();

    res.render('faq/excluir', {
        faqs
    });
}


function postExcluir(req, res) {

    const id = Number(req.params.id);

    let faqs = lerFaqs();

    faqs = faqs.filter(faq => faq.id !== id);

    salvarFaqs(faqs);

    res.redirect('/faq/excluir');
}

module.exports = {
    getFaqs,
    getInserir,
    postInserir,
    getExcluir,
    postExcluir
};

