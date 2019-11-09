async function getHistorico (steamid, client) {

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const queryVendeu = {
        text: 'SELECT username, nome, foto, r.preco, dtvenda FROM usuario INNER JOIN (SELECT compradorid, vendedorid, nome, foto, h.preco, dtvenda FROM historicovendas h INNER JOIN skin s on  s.skinid = h.skinid) r ON steamid = compradorid WHERE vendedorid = ($1) ORDER BY dtvenda DESC;',
        rowMode: 'array'
    }

    const queryComprou = {
        text: 'SELECT username, nome, foto, r.preco, dtvenda FROM usuario INNER JOIN (SELECT vendedorid, compradorid, nome, foto, h.preco, dtvenda FROM historicovendas h INNER JOIN skin s on  s.skinid = h.skinid) r ON steamid = vendedorid WHERE compradorid = ($1) ORDER BY dtvenda DESC;',
        rowMode: 'array'
    }

    var resultadoFinal = [];
    var res1 = await client.query(queryVendeu, [steamid]);
    resultadoFinal = resultadoFinal.concat(res1.rows);
    resultadoFinal.forEach((element) =>{
        element.unshift(true);
    });

    var res2 = await client.query(queryComprou, [steamid]);
    resultadoFinal = resultadoFinal.concat(res2.rows);
    resultadoFinal.forEach((element) =>{
        if(element[0] != true)
            element.unshift(false);
        var data = new Date(element[5]);
        if (data.getDate() < 10)
            var dia = '0' + data.getDate();
        element[5] = dia+'/'+(parseInt(data.getMonth())+1)+'/'+data.getFullYear();
    });
    
    return resultadoFinal;
}

module.exports.getHistorico = getHistorico;