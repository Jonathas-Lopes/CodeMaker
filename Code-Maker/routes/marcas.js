const express = require("express");
const router = express.Router();
const marcasController = require("../controller/marcasController.js");

// Rota para consultar / listar marcas
router.get("/", marcasController.listarMarcas);

// Rotas para inserir marcas
router.get("/inserir", marcasController.formInserir);
router.post("/inserir", marcasController.inserirMarca);

// Rota para excluir marca
router.get("/excluir/:id", marcasController.excluirMarca);

module.exports = router;
