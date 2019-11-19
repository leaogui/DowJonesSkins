/* jshint esversion:8 */
async function depositSkin (client, skin , steamId){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const queries = require('./repetedQueryConsts');

    const insertInventario = {
        text: "INSERT INTO inventario VALUES (($1), ($2), '0')",
        rowMode: 'array'
    };
    var res1 = await client.query(queries.querySkinIdByName, [skin]);
    var skinid = arrayCleaner.arrayCleaner(res1.rows);
    await client.query(insertInventario, [steamId, skinid[0]]);
}

module.exports.depositSkin = depositSkin;