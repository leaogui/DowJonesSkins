async function getHistorico (steamid, client) {
/*
    const queryVendeu = {
        text: 'SELECT username, nome, foto, h.preco, h.dtvenda FROM historicovendas h INNER JOIN skin s ON s.skinid = h.skinid WHERE vendedorid = ($1) ORDER BY dtvenda DESC;',
        rowMode: 'array'
    }

    const queryComprou = {
        text: 'SELECT username, nome, foto, h.preco, h.dtvenda FROM historicovendas h INNER JOIN skin s ON s.skinid = h.skinid WHERE compradorid = ($1) ORDER BY dtvenda DESC;',
        rowMode: 'array'
    }

    var resultadoFinal = [];
    var res1 = await client.query(queryVendeu, [steamid]);
    resultadoFinal = resultadoFinal.concat(res1.rows);

    var res2 = await client.query(queryComprador, [steamid]);
    resultadoFinal = resultadoFinal.concat(res2.rows);

    var res3 = await client.query(queryComprou, [steamid]);
    resultadoFinal = resultadoFinal.concat(res3.rows);

    var res4 = await client.query(queryVendedor, [steamid]);
    resultadoFinal = resultadoFinal.concat(res4.rows);
    
    return resultadoFinal;*/
}

module.exports.getHistorico = getHistorico;