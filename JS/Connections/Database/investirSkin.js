async function investirSkin (client, skin, steamId){
    const query1 = {
        text: 'SELECT skinid FROM skin WHERE nome = ($1)',
        rowMode: 'array'
    }
    const query2 = {
        text: "UPDATE inventario SET investida = '1', data = ($1) WHERE steamid = ($2) AND skinid = ($3)",
        rowMode: 'array'
    }
    var res1 = await client.query(query1, [skin]);
    var skinid = res1.rows[0];
    skinid = JSON.stringify(skinid);
    skinid = skinid.replace('"', '');
    skinid = skinid.replace('"', '');
    skinid = skinid.replace('[', '');
    skinid = skinid.replace(']', '');
    await client.query(query2, [new Date(), steamId, skinid]);
}

module.exports.investirSkin = investirSkin;