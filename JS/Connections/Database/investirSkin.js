async function investirSkin (client, skin, steamId){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const query1 = {
        text: 'SELECT skinid, preco FROM skin WHERE nome = ($1);',
        rowMode: 'array'
    }
    const query2 = {
        text: "UPDATE inventario SET investida = '1', data = ($1) WHERE steamid = ($2) AND skinid = ($3);",
        rowMode: 'array'
    }

    const query3 = {
        text: "SELECT skinid FROM inventario WHERE skinid = ($1) AND investida = '1';",
        rowMode: 'array'
    }

    const query4 = {
        text: "UPDATE skin SET preco = ($1) WHERE skinid = ($2);",
        rowMode: 'array'
    }

    var res1 = await client.query(query1, [skin]);
    var skinInfo = arrayCleaner.arrayCleaner(res1.rows[0]);

    var res2 = await client.query(query3, [skinInfo[0]]);

    await client.query(query2, [new Date(), steamId, skinInfo[0]]);
    
    var valor = parseFloat(skinInfo[1]);

    if (res2.rowCount == 0){
        valor = valor + (valor*0.15);
    } else {
        valor = valor - (valor*0.03);
    }
    await client.query(query4, [valor.toFixed(2), skinInfo[0]]);
}

module.exports.investirSkin = investirSkin;