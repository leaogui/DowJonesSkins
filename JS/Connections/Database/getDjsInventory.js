/* jshint esversion:8 */
async function getDjsInventory(steamid, client){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const query = {
        text: 'SELECT nome FROM skin s INNER JOIN inventario i ON s.skinid = i.skinid WHERE steamid = ($1) ORDER BY nome;',
        rowMode: 'array'
    };

    var res = await client.query(query, [steamid]);
    resultado = res.rows;
    return arrayCleaner.arrayCleaner(resultado);
}

module.exports.getDjsInventory = getDjsInventory;