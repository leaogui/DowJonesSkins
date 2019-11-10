async function comprarSkin (client, skin, steamId){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const query1 = {
        text: 'SELECT saldo FROM usuario WHERE steamid = ($1);',
        rowMode: 'array'
    }

    const query2 = {
        text: 'SELECT skinid, preco FROM skin WHERE nome = ($1)',
        rowMode: 'array'
    }
    const query3 = {
        text: 'SELECT steamid from inventario WHERE steamid <> ($1) AND skinid = ($2) ORDER BY data DESC FETCH FIRST 1 rows only',
        rowMode: 'array'
    }
    const query4 = {
        text: 'UPDATE inventario set investida = false, steamid = ($1) WHERE steamid = ($2) AND skinid = ($3)',
        rowMode: 'array'
    }
    
    const query5 = {
        text: 'INSERT INTO historicovendas VALUES (($1) , ($2), ($3), ($4), ($5));',
        rowMode: 'array'
    }

    const query6 = {
        text: 'UPDATE usuario set saldo = ($1) WHERE steamid = ($2);',
        rowMode: 'array'
    }

    const query7 = {
        text: 'UPDATE skin SET preco = ($1) WHERE skinid = ($2);',
        rowMode: 'array'
    }

    var res1 = await client.query(query1, [steamId]);
    var saldo = arrayCleaner.arrayCleaner(res1.rows[0]);

    var res2 = await client.query(query2, [skin]);
    var skinInfo = arrayCleaner.arrayCleaner(res2.rows[0]);

    if (parseFloat(saldo[0]) >= parseFloat(skinInfo[1])){

        var valor = parseFloat(saldo[0]) - parseFloat(skinInfo[1]);
        await client.query(query6, [valor.toFixed(2), steamId]);

        var res3 = await client.query(query3, [steamId, skinInfo[0]]);
        var steamIdOwner = arrayCleaner.arrayCleaner(res3.rows[0]);

        await client.query(query4, [steamId, steamIdOwner[0], skinInfo[0]]);
        await client.query(query5, [steamIdOwner[0], steamId, skinInfo[0], skinInfo[1], new Date()]);

        var precoNovo = parseFloat(skinInfo[1]) + (parseFloat(skinInfo[1])*0.05);
        await client.query(query7, [precoNovo.toFixed(2), skinInfo[0]]);
    }
}

module.exports.comprarSkin = comprarSkin;