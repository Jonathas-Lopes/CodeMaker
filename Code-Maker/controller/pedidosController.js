
const fs = require('fs').promises;
const path = require('path');

const arquivo = path.join(__dirname, '../bd/pedidos.json');

async function listar() {
    const dados = await fs.readFile(arquivo, 'utf8');
    return JSON.parse(dados);
}

async function salvarDados(pedidos) {
    await fs.writeFile(
        arquivo,
        JSON.stringify(pedidos, null, 2),
        'utf8'
    );
}

exports.index = async (req, res) => {
    try {
        const pedidos = await listar();

        res.render('pedidos/index', {
            pedidos,
            mensagem: req.query.mensagem
        });
    } catch (erro) {
        res.status(500).send('Erro ao consultar pedidos.');
    }
};

exports.novo = (req, res) => {
    res.render('pedidos/novo');
};

exports.salvar = async (req, res) => {
    try {
        const pedidos = await listar();

        const novoPedido = {
            id: pedidos.length
                ? Math.max(...pedidos.map(p => Number(p.id))) + 1
                : 1,
            produto: req.body.produto,
            quantidade: Number(req.body.quantidade),
            valor: Number(req.body.valor),
            imagem: req.body.imagem || '/imagens/sem-imagem.png'
        };

        pedidos.push(novoPedido);

        await salvarDados(pedidos);

        res.redirect('/pedidos?mensagem=cadastrado');
    } catch (erro) {
        res.status(500).send('Erro ao cadastrar pedido.');
    }
};

exports.excluir = async (req, res) => {
    try {
        const pedidos = await listar();

        const novosPedidos = pedidos.filter(
            pedido => String(pedido.id) !== req.params.id
        );

        if (novosPedidos.length === pedidos.length) {
            return res.redirect('/pedidos?mensagem=nao-encontrado');
        }

        await salvarDados(novosPedidos);

        res.redirect('/pedidos?mensagem=excluido');
    } catch (erro) {
        res.status(500).send('Erro ao excluir pedido.');
    }
};