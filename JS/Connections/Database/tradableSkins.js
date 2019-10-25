async function getTradableSkins(skinList, client){
    const query = {
        text: 'SELECT nome FROM skin',
        rowMode: 'array'
    }
    
    var res = await client.query(query);
    tradableSkins = res.rows;
    var filtrado = [];
    skinList.forEach((element1) => {
        tradableSkins.forEach((element2) => {
            element2 = JSON.stringify(element2);
            element2 = element2.replace('"', '');
            element2 = element2.replace('"', '');
            element2 = element2.replace('[', '');
            element2 = element2.replace(']', '');
            if (element1.includes(element2)){
                if (!filtrado.includes(element2))
                    filtrado.push(element2);
            }
        });
    });
    return filtrado;
}

module.exports.getTradableSkins = getTradableSkins;