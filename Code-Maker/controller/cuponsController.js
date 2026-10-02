const cupons = require('../bd/cupons.json');

function getCupons(req, res) {
    res.render('cupons', { cupons });
}

module.exports = {
    getCupons
};