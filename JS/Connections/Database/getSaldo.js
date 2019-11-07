async function getSaldo(steamid, client){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const query = {
        text: 'SELECT saldo FROM usuario WHERE steamid = ($1);',
        rowMode: 'array'
    }
    
    var res = await client.query(query, [steamid]);

    return arrayCleaner.arrayCleaner(res.rows);
}

module.exports.getSaldo = getSaldo;