async function getHistorico (steamid, client) {

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const queryVendeu = {
        text: 'SELECT username, nome, foto, r.preco, dtvenda FROM usuario INNER JOIN (SELECT vendedorid, nome, foto, h.preco, dtvenda FROM historicovendas h INNER JOIN skin s on  s.skinid = h.skinid) r ON steamid = vendedorid WHERE vendedorid = ($1) ORDER BY dtvenda DESC;',
        rowMode: 'array'
    }

    const queryComprou = {
        text: 'SELECT username, nome, foto, r.preco, dtvenda FROM usuario INNER JOIN (SELECT compradorid, nome, foto, h.preco, dtvenda FROM historicovendas h INNER JOIN skin s on  s.skinid = h.skinid) r ON steamid = compradorid WHERE compradorid = ($1) ORDER BY dtvenda DESC;',
        rowMode: 'array'
    }

    var resultadoFinal = [];
    var res1 = await client.query(queryVendeu, [steamid]);
    resultadoFinal = resultadoFinal.concat(res1.rows);

    var res2 = await client.query(queryComprou, [steamid]);
    resultadoFinal = resultadoFinal.concat(res2.rows);
    
    return arrayCleaner.arrayCleaner(resultadoFinal);
}

module.exports.getHistorico = getHistorico;