async function retirarSkin (client, skin , steamId){
    const query1 = {
        text: 'SELECT skinid FROM skin WHERE nome = ($1)',
        rowMode: 'array'
    }
    const query2 = {
        text: 'DELETE FROM inventario WHERE steamid = ($1) AND skinid = ($2)',
        rowMode: 'array'
    }
    var res1 = await client.query(query1, [skin]);
    var skinid = res1.rows[0];
    skinid = JSON.stringify(skinid);
    skinid = skinid.replace('"', '');
    skinid = skinid.replace('"', '');
    skinid = skinid.replace('[', '');
    skinid = skinid.replace(']', '');
    console.log(skinid);
    await client.query(query2, [steamId, skinid]);
}

module.exports.retirarSkin = retirarSkin;