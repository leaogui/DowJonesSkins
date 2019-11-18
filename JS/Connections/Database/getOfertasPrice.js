/* jshint esversion:8 */
async function getOfertasPrice(skins, client){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const query = {
        text: 'SELECT preco FROM skin WHERE nome = ANY ($1) ORDER BY nome;',
        rowMode: 'array'
    };
    
    var res = await client.query(query, [skins]);
    
    return arrayCleaner.arrayCleaner(res.rows);
}

module.exports.getOfertasPrice = getOfertasPrice;