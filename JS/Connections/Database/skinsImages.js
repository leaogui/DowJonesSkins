/* jshint esversion:8 */
async function getSkinsImages(tradableSkins, client){
    const query = {
        text: 'SELECT foto FROM skin WHERE nome = ($1);',
        rowMode: 'array'
    };
    

    var skinsImages = [];
    for(i = 0; i < tradableSkins.length; i++){
        var res = await client.query(query, [tradableSkins[i]]);
        skinsImages = skinsImages.concat(res.rows);
    }
    
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