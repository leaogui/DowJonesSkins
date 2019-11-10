async function retirarInvestimento (client, skin , steamId){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const query1 = {
        text: 'SELECT skinid, preco FROM skin WHERE nome = ($1)',
        rowMode: 'array'
    }
    const query2 = {
        text: 'UPDATE inventario set investida = false WHERE steamid = ($1) AND skinid = ($2)',
        rowMode: 'array'
    }

    const query3 = {
        text: 'UPDATE skin set preco = ($1) WHERE skinid = ($2)',
        rowMode: 'array'
    }

    var res1 = await client.query(query1, [skin]);
    var skinInfo = arrayCleaner.arrayCleaner(res1.rows[0]);
    await client.query(query2, [steamId, skinInfo[0]]);
    var valor = parseFloat(skinInfo[1]) + (parseFloat(skinInfo[1])*0.02);
    await client.query(query3, [valor.toFixed(2), skinInfo[0]]);
}

module.exports.retirarInvestimento = retirarInvestimento;