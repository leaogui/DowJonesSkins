/* jshint esversion:8 */
async function retirarSkin (client, skin , steamId){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const queries = require('./repetedQueryConsts');

    const deleteInventario = {
        text: 'DELETE FROM inventario WHERE ctid IN (SELECT ctid FROM inventario WHERE steamid = ($1) AND skinid = ($2) AND investida = false LIMIT 1);',
        rowMode: 'array'
    };
    var res1 = await client.query(queries.querySkinIdByName, [skin]);
    var skinid = arrayCleaner.arrayCleaner(res1.rows);
    await client.query(deleteInventario, [steamId, skinid[0]]);
}

module.exports.retirarSkin = retirarSkin;