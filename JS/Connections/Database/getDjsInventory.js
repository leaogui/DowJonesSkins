async function getDjsInventory(steamid, client){
    const query1 = {
        text: 'SELECT skinid FROM inventario WHERE steamid = ($1);',
        rowMode: 'array'
    }

    const query2 = {
        text: 'SELECT nome FROM skin WHERE skinid = ANY ($1) ORDER BY nome;',
        rowMode: 'array'
    }
    
    var res = await client.query(query1, [steamid]);
    resultado1 = res.rows;
    var cleaned1 = [];
    resultado1.forEach((element) => {
        element = JSON.stringify(element);
        element = element.replace('"', '');
        element = element.replace('"', '');
        element = element.replace('[', '');
        element = element.replace(']', '');
        cleaned1.push(element);
    });

    var res2 = await client.query(query2, [cleaned1])
    resultado2 = res2.rows;
    var cleaned2 = [];
    resultado2.forEach((element) => {
        element = JSON.stringify(element);
        element = element.replace('"', '');
        element = element.replace('"', '');
        element = element.replace('[', '');
        element = element.replace(']', '');
        cleaned2.push(element);
    });
    return cleaned2;
}

module.exports.getDjsInventory = getDjsInventory;