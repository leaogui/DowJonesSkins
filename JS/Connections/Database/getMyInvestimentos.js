/* jshint esversion:8 */
async function getMyInvestimentos(steamid, client){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const queryMyInvestimentos = {
        text: 'SELECT nome FROM skin s INNER JOIN inventario i ON s.skinid = i.skinid WHERE steamid = ($1) and investida = true ORDER BY nome;',
        rowMode: 'array'
    };
    
    var res = await client.query(queryMyInvestimentos, [steamid]);
    
    return arrayCleaner.arrayCleaner(res.rows);
}

module.exports.getMyInvestimentos = getMyInvestimentos;