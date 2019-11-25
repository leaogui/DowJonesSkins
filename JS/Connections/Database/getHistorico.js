/* jshint esversion:8 */
async function getHistorico (steamid, client) {

    const queryVendeu = {
        text: 'SELECT username, nome, foto, r.preco, dtvenda FROM usuario INNER JOIN (SELECT compradorid, vendedorid, nome, foto, h.preco, dtvenda FROM historicovendas h INNER JOIN skin s on  s.skinid = h.skinid) r ON steamid = compradorid WHERE vendedorid = ($1) ORDER BY dtvenda DESC;',
        rowMode: 'array'
    };

    const queryComprou = {
        text: 'SELECT username, nome, foto, r.preco, dtvenda FROM usuario INNER JOIN (SELECT vendedorid, compradorid, nome, foto, h.preco, dtvenda FROM historicovendas h INNER JOIN skin s on  s.skinid = h.skinid) r ON steamid = vendedorid WHERE compradorid = ($1) ORDER BY dtvenda DESC;',
        rowMode: 'array'
    };

    var res1 = await client.query(queryVendeu, [steamid]);
    res1.rows.forEach((element) =>{
        element.unshift(true);
    });

    var res2 = await client.query(queryComprou, [steamid]);
    var resTotal = res1.rows.concat(res2.rows);
    resTotal.forEach((element) =>{
        if(element[0] != true)
            element.unshift(false);
        var data = new Date(element[5]);
        var dia;
        if (parseInt(data.getDate()) < 10)
            dia = '0' + data.getDate();
        else
            dia = data.getDate();
        element[5] = dia+'/'+(parseInt(data.getMonth())+1)+'/'+data.getFullYear();
    });
    
    return resTotal;
}

module.exports.getHistorico = getHistorico;