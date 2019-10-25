async function getSkinsImages(tradableSkins, client){
    const query = {
        text: 'SELECT foto FROM skin WHERE nome = ANY ($1)',
        rowMode: 'array'
    }
    
    var res = await client.query(query, [tradableSkins]);
    var skinsImages = res.rows;
    var filtrado = [];
    skinsImages.forEach((element) => {
        element = JSON.stringify(element);
        element = element.replace('"', '');
        element = element.replace('"', '');
        element = element.replace('[', '');
        element = element.replace(']', '');
        filtrado.push(element);
    });
    return filtrado;
}

module.exports.getSkinsImages = getSkinsImages;