async function depositarCarteira (steamid, client){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const query1 = {
        text: 'SELECT saldo FROM usuario WHERE steamid = ($1);',
        rowMode: 'array'
    };
    const query2 = {
        text: "UPDATE usuario SET saldo = ($1) WHERE steamid = ($2);",
        rowMode: 'array'
    };
    var res = await client.query(query1, [steamid]);
    var saldo = arrayCleaner.arrayCleaner(res.rows);
    var valor = parseFloat(saldo[0]) + 15;
    await client.query(query2, [valor, steamid]);
}

module.exports.depositarCarteira = depositarCarteira;