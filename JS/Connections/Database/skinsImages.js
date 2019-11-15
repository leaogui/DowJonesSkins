/* jshint esversion:8 */
async function getSkinsImages(tradableSkins, client){

    const arrayCleaner = require('../../scripts/arrayCleaner');

    const query = {
        text: 'SELECT foto FROM skin WHERE nome = ($1);',
        rowMode: 'array'
    };
    

    var skinsImages = [];
    for(i = 0; i < tradableSkins.length; i++){
        var res = await client.query(query, [tradableSkins[i]]);
        skinsImages = skinsImages.concat(res.rows);
    }

    return arrayCleaner.arrayCleaner(skinsImages);
}

module.exports.getSkinsImages = getSkinsImages;