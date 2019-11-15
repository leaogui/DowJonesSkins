/* jshint esversion:8 */
//Classe responsável pelas operações CRUD de um usuário
async function signUp(client, json){
    const query = {
        text: 'SELECT steamId FROM Usuario WHERE steamId = ($1);',
        rowMode: 'array'
    };

    var res = await client.query(query, [json.steamid]);
    var count = res.rowCount;
    if (count == 0){

        const insert = {
            text: 'INSERT INTO Usuario VALUES(($1), ($2), ($3), ($4), ($5), ($6), 0);',
            rowMode: 'array'
        };

        await client.query(insert, [json.steamid, json.username, json.profileurl, json.avatar.small, json.avatar.medium, json.avatar.large]);
    }
}

module.exports.signUp = signUp;