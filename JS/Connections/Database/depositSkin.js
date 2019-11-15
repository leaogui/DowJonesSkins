/* jshint esversion:8 */
async function depositSkin (client, skin , steamId){
    const query1 = {
        text: 'SELECT skinid FROM skin WHERE nome = ($1)',
        rowMode: 'array'
    };
    const query2 = {
        text: "INSERT INTO inventario VALUES (($1), ($2), '0')",
        rowMode: 'array'
    };
    var res1 = await client.query(query1, [skin]);
    var skinid = res1.rows[0];
    skinid = JSON.stringify(skinid);
    skinid = skinid.replace('"', '');
    skinid = skinid.replace('"', '');
    skinid = skinid.replace('[', '');
    skinid = skinid.replace(']', '');
    await client.query(query2, [steamId, skinid]);
}

module.exports.depositSkin = depositSkin;