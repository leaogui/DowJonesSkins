async function getTradableSkins(steamid, skinList, client){

    const djsInventory = require('./getDjsInventory');
    var depositedSkins = await djsInventory.getDjsInventory(steamid, client);
    const query = {
        text: 'SELECT nome FROM skin WHERE nome <> ALL ($1) ORDER BY nome;',
        rowMode: 'array'
    }
    var res = await client.query(query, [depositedSkins]);
    tradableSkins = res.rows;
    var filtrado = [];
    tradableSkins.forEach((element1) => {
        element1 = JSON.stringify(element1);
        element1 = element1.replace('"', '');
        element1 = element1.replace('"', '');
        element1 = element1.replace('[', '');
        element1 = element1.replace(']', '');
        skinList.forEach((element2) => {
            if (element2.includes(element1) && !filtrado.includes(element1)){
                filtrado.push(element1);
            }
        });
    });
    return filtrado;
}

module.exports.getTradableSkins = getTradableSkins;