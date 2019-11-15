/* jshint esversion:8 */
async function getTradableSkins(steamid, skinList, client){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const djsInventory = require('./getDjsInventory');
    var depositedSkins = await djsInventory.getDjsInventory(steamid, client);
    const query = {
        text: 'SELECT nome FROM skin WHERE nome <> ALL ($1) ORDER BY nome;',
        rowMode: 'array'
    };
    var res = await client.query(query, [depositedSkins]);
    tradableSkins = res.rows;
    var filtrado = [];
    tradableSkins = arrayCleaner.arrayCleaner(tradableSkins);
    tradableSkins.forEach((element1) => {
        skinList.forEach((element2) => {
            if (element2.includes(element1)){
                filtrado.push(element1);
            }
        });
    });
    return filtrado;
}

module.exports.getTradableSkins = getTradableSkins;