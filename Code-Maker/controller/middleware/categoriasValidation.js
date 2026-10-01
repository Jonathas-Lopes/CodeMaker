
function categoriasValidation(req, res, next) {
    if ( req.body.nome === "" || req.body.foto === "") {
         res.send("Preencha todos os campos obrigatórios!"); 
}  else {
    next();
}
}
module.exports = categoriasValidation;