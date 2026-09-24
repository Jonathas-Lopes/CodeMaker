const fs = require('fs');
const path = require('path');

const arquivo = path.join(__dirname, '..', 'bd', 'estoque.json');
let operacaoPendente = Promise.resolve();

async function lerEstoque() {
    const dados = await fs.promises.readFile(arquivo, 'utf8');
    return JSON.parse(dados);
}

async function gravarEstoque(estoque) {
    const arquivoTemporario = `${arquivo}.${process.pid}.tmp`;
    await fs.promises.writeFile(arquivoTemporario, JSON.stringify(estoque, null, 2));
    await fs.promises.rename(arquivoTemporario, arquivo);
}

function executarAlteracao(alterar) {
    const operacao = operacaoPendente.then(async () => {
        const estoque = await lerEstoque();
        const resultado = await alterar(estoque);
        await gravarEstoque(estoque);
        return resultado;
    });

    operacaoPendente = operacao.catch(() => undefined);
    return operacao;
}

exports.consultar = async (req, res, next) => {
    try {
        const estoque = await lerEstoque();
        res.render('estoque/index', { estoque });
    } catch (error) {
        next(error);
    }
};

exports.novo = (req, res) => {
    res.render('estoque/novo');
};

exports.salvar = async (req, res, next) => {
    try {
        await executarAlteracao((estoque) => {
            estoque.push({
                id: estoque.reduce((maiorId, item) => Math.max(maiorId, Number(item.id) || 0), 0) + 1,
                produto: req.body.produto,
                variacao: req.body.variacao,
                quantidade: req.body.quantidade
            });
        });

        res.redirect('/estoque');
    } catch (error) {
        next(error);
    }
};

exports.excluir = async (req, res, next) => {
    try {
        const removido = await executarAlteracao((estoque) => {
            const id = Number(req.params.id);
            const tamanhoAnterior = estoque.length;
            const estoqueAtualizado = estoque.filter(item => item.id !== id);

            estoque.splice(0, estoque.length, ...estoqueAtualizado);
            return estoque.length !== tamanhoAnterior;
        });

        if (!removido) {
            return res.status(404).send('Produto não encontrado.');
        }

        res.redirect('/estoque');
    } catch (error) {
        next(error);
    }
};