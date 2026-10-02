const mensagens = [];
 
class MensagemController {
 
static consultar(req, res) {
res.render('mensagens/consultar', {
mensagens
});
}
 
static inserirForm(req, res) {
res.render('mensagens/inserir');
}
 
static inserir(req, res) {
 
const novaMensagem = {
id: mensagens.length + 1,
cliente: req.body.cliente,
assunto: req.body.assunto,
mensagem: req.body.mensagem
};
 
mensagens.push(novaMensagem);
 
res.redirect
}
}