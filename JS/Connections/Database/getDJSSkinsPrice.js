async function getDJSSkinsPrice(steamid, client){

    const query = {
        text: 'SELECT preco FROM skin s INNER JOIN inventario i ON s.skinid = i.skinid WHERE steamid = ($1) ORDER BY nome;',
        rowMode: 'array'
    }
    
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

module.exports.getDJSSkinsPrice = getDJSSkinsPrice;