async function comprarSkin (client, skin , steamId){
    const query1 = {
        text: 'SELECT skinid FROM skin WHERE nome = ($1)',
        rowMode: 'array'
    }
    const query2 = {
        text: 'SELECT steamid from inventario WHERE steamid <> ($1) AND skinid = ($2) ORDER BY data DESC FETCH FIRST 1 rows only',
        rowMode: 'array'
    }
    const query3 = {
        text: 'UPDATE inventario set investida = false, steamid = ($1) WHERE steamid = ($2) AND skinid = ($3)',
        rowMode: 'array'
    }
    const query4 = {
        text: 'SELECT preco FROM skin WHERE skinid = ($1)',
        rowMode: 'array'
    }
    const query5 = {
        text: 'INSERT INTO historicovendas VALUES (($1) , ($2), ($3), ($4), ($5));',
        rowMode: 'array'
    }

    var res1 = await client.query(query1, [skin]);
    var skinid = res1.rows[0];
    skinid = JSON.stringify(skinid);
    skinid = skinid.replace('"', '');
    skinid = skinid.replace('"', '');
    skinid = skinid.replace('[', '');
    skinid = skinid.replace(']', '');
    var res2 = await client.query(query2, [steamId, skinid]);
    var steamIdOwner = res2.rows[0];
    steamIdOwner = JSON.stringify(steamIdOwner);
    steamIdOwner = steamIdOwner.replace('"', '');
    steamIdOwner = steamIdOwner.replace('"', '');
    steamIdOwner = steamIdOwner.replace('[', '');
    steamIdOwner = steamIdOwner.replace(']', '');
    await client.query(query3, [steamId, steamIdOwner, skinid]);
    var res3 = await client.query(query4, [skinid]);
    var skinPrice = res3.rows[0];
    skinPrice = JSON.stringify(skinPrice);
    skinPrice = skinPrice.replace('"', '');
    skinPrice = skinPrice.replace('"', '');
    skinPrice = skinPrice.replace('[', '');
    skinPrice = skinPrice.replace(']', '');
    await client.query(query5, [steamIdOwner, steamId, skinid, skinPrice, new Date()]);
}

module.exports.comprarSkin = comprarSkin;