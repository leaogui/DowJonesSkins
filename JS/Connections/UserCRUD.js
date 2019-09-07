//Classe responsável pelas operações CRUD de um usuário
class UserCRUD{
    static signUp(client, json){

        let count = 0;
        client.query('SELECT steamId FROM Usuario WHERE steamId = '+json.steamid+';', (err, res) => {
            console.log(res);
        });
        if (count == 0){
            client.query('INSERT INTO Usuario VALUES('
            +json.steamid+', '
            +username+', '
            +profile+', '
            +json.avatar.small+', '
            +json.avatar.medium+', '
            +json.avatar.large+');', (err, res) => {
                if (err) throw err;
                for (let row of res.rows) {
                console.log(JSON.stringify(row));
                }
            });
        }
    }
}

module.exports = UserCRUD;