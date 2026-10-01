const fs = require('fs').promises;
const path = require('path');

const arquivoTrocas = path.join(__dirname, '..', 'bd', 'trocas.json');

async function lerTrocas() {
  const conteudo = await fs.readFile(arquivoTrocas, 'utf8');
  return JSON.parse(conteudo);
}

async function listar(req, res, next) {
  try {
    const trocas = await lerTrocas();
    res.render('trocas/index', {
      trocas,
      mensagem: req.query.mensagem || ''
    });
  } catch (erro) {
    next(erro);
  }
}

function mostrarFormulario(req, res) {
  res.render('trocas/nova', { erro: '' });
}

async function cadastrar(req, res, next) {
  try {
    const trocas = await lerTrocas();
    const proximoId = trocas.reduce((maior, troca) => Math.max(maior, troca.id), 0) + 1;
    const novaTroca = {
      id: proximoId,
      pedido: req.body.pedido.trim(),
      cliente: req.body.cliente.trim(),
      produto: req.body.produto.trim(),
      tipo: req.body.tipo,
      motivo: req.body.motivo.trim(),
      status: 'Solicitada',
      dataSolicitacao: new Date().toISOString().slice(0, 10)
    };

    trocas.push(novaTroca);
    await fs.writeFile(arquivoTrocas, `${JSON.stringify(trocas, null, 2)}\n`, 'utf8');
    res.redirect('/trocas?mensagem=Solicitação cadastrada com sucesso.');
  } catch (erro) {
    next(erro);
  }
}

async function excluir(req, res, next) {
  try {
    const trocas = await lerTrocas();
    const id = Number(req.params.id);
    const trocasAtualizadas = trocas.filter(troca => troca.id !== id);

    if (trocasAtualizadas.length === trocas.length) {
      return res.redirect('/trocas?mensagem=Solicitação não encontrada.');
    }

    await fs.writeFile(arquivoTrocas, `${JSON.stringify(trocasAtualizadas, null, 2)}\n`, 'utf8');
    res.redirect('/trocas?mensagem=Solicitação removida com sucesso.');
  } catch (erro) {
    next(erro);
  }
}

module.exports = { listar, mostrarFormulario, cadastrar, excluir };
