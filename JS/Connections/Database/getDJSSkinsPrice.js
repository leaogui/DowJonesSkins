/* jshint esversion:8 */
async function getDJSSkinsPrice(steamid, client){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const queryDJSSkinsPrice = {
        text: 'SELECT preco FROM skin s INNER JOIN inventario i ON s.skinid = i.skinid WHERE steamid = ($1) ORDER BY nome;',
        rowMode: 'array'
    };
    
    var res = await client.query(queryDJSSkinsPrice, [steamid]);

    return arrayCleaner.arrayCleaner(res.rows);
}

module.exports.getDJSSkinsPrice = getDJSSkinsPrice;