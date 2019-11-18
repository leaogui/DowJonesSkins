/* jshint esversion:8 */
async function getAllInvestimentos(steamid, client){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const queryAllInvestimentos = {
        text: 'SELECT DISTINCT nome FROM skin s INNER JOIN inventario i ON s.skinid = i.skinid WHERE steamid <> ($1) and investida = true ORDER BY nome;',
        rowMode: 'array'
    };
    
    var res = await client.query(queryAllInvestimentos, [steamid]);
 
    return arrayCleaner.arrayCleaner(res.rows);
}

module.exports.getAllInvestimentos = getAllInvestimentos;