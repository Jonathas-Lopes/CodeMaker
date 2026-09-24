const marcas = require("../bd/marcas.json");

function listarMarcas(req, res) {
  res.render("marcas", { marcas });
}

function formInserir(req, res) {
  // Tela de formulário (vamos criar em breve)
  res.render("marcas");
}

function inserirMarca(req, res) {
  // Lógica de inserção futura
  res.redirect("/marcas");
}

function excluirMarca(req, res) {
  // Lógica de exclusão futura
  res.redirect("/marcas");
}

module.exports = {
  listarMarcas,
  formInserir,
  inserirMarca,
  excluirMarca,
};
