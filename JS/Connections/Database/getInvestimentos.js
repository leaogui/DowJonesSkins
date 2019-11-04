async function getInvestimentos(djsSkins, steamid, client){
    const query1 = {
        text: 'SELECT skinid FROM skin WHERE nome = ANY ($1) ORDER BY nome;',
        rowMode: 'array'
    }

    const query2 = {
        text: 'SELECT investida FROM inventario i INNER JOIN skin s on i.skinid = s.skinid WHERE i.skinid = ANY ($1) AND steamid = ($2) ORDER BY nome;',
        rowMode: 'array'
    }
    
    var res = await client.query(query1, [djsSkins]);
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

    var res2 = await client.query(query2, [cleaned1, steamid]);
    resultado2 = res2.rows;
    var cleaned2 = [];
    resultado2.forEach((element) => {
        element = JSON.stringify(element);
        element = element.replace('"', '');
        element = element.replace('"', '');
        element = element.replace('[', '');
        element = element.replace(']', '');
        element = (element == 'true');
        cleaned2.push(element);
    });
    return cleaned2;
}

module.exports.getInvestimentos = getInvestimentos;