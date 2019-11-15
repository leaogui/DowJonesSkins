/* jshint esversion:8 */
async function depositSkin (client, skin , steamId){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const query1 = {
        text: 'SELECT skinid FROM skin WHERE nome = ($1)',
        rowMode: 'array'
    };
    const query2 = {
        text: "INSERT INTO inventario VALUES (($1), ($2), '0')",
        rowMode: 'array'
    };
    var res1 = await client.query(query1, [skin]);
    var skinid = arrayCleaner.arrayCleaner(res1.rows);
    await client.query(query2, [steamId, skinid[0]]);
}

module.exports.depositSkin = depositSkin;