async function getOfertasPrice(skins, client){
    const query = {
        text: 'SELECT preco FROM skin WHERE nome = ANY ($1) ORDER BY nome;',
        rowMode: 'array'
    }
    
    var res = await client.query(query, [skins]);
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

module.exports.getOfertasPrice = getOfertasPrice;