async function getMyInvestimentos(steamid, client){

    const query = {
        text: 'SELECT nome FROM skin s INNER JOIN inventario i ON s.skinid = i.skinid WHERE steamid = ($1) and investida = true ORDER BY nome;',
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

module.exports.getMyInvestimentos = getMyInvestimentos;