/* jshint esversion:8 */
async function getMySkinsPrice(steamid, client){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const query = {
        text: 'SELECT preco FROM skin s INNER JOIN inventario i ON s.skinid = i.skinid WHERE steamid = ($1) and investida = true ORDER BY nome;',
        rowMode: 'array'
    };
    
    var res = await client.query(query, [steamid]);
    return arrayCleaner.arrayCleaner(res.rows);
}

module.exports.getMySkinsPrice = getMySkinsPrice;