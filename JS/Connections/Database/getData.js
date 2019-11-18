/* jshint esversion:8 */
async function getData(skins, steamid, client){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const query1 = {
        text: 'SELECT skinid FROM skin WHERE nome = ANY ($1) ORDER BY nome;',
        rowMode: 'array'
    };

    const query2 = {
        text: 'SELECT data FROM inventario i INNER JOIN skin s on i.skinid = s.skinid WHERE i.skinid = ANY ($1) AND steamid = ($2) ORDER BY nome;',
        rowMode: 'array'
    };
    
    var res = await client.query(query1, [skins]);
    var cleaned1 = arrayCleaner.arrayCleaner(res.rows);

    var res2 = await client.query(query2, [cleaned1, steamid]);
    var cleaned2 = [];
    var resultado2 = arrayCleaner.arrayCleaner(res2.rows);
    resultado2.forEach((element) => {
        var dia = element.slice(8, 10);
        var mes = element.slice(5, 7);
        var ano = element.slice(0, 4);
        var diferenca = (new Date() - new Date(ano, parseInt(mes)-1, dia));
        diferenca = diferenca / (1000 * 3600 * 24);
        element = (diferenca >= 31);
        cleaned2.push(element);
    });
    return cleaned2;
}

module.exports.getData = getData;