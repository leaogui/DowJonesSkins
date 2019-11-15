/* jshint esversion:8 */
async function getDjsInventory(steamid, client){

    const query = {
        text: 'SELECT nome FROM skin s INNER JOIN inventario i ON s.skinid = i.skinid WHERE steamid = ($1) ORDER BY nome;',
        rowMode: 'array'
    };

    var res = await client.query(query, [steamid]);
    resultado = res.rows;
    var cleaned = [];
    resultado.forEach((element) => {
        element = JSON.stringify(element);
        element = element.replace('"', '');
        element = element.replace('"', '');
        element = element.replace('[', '');
        element = element.replace(']', '');
        cleaned.push(element);
    });
    return cleaned;
}

module.exports.getDjsInventory = getDjsInventory;