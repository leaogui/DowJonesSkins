//Classe responsável pelas operações CRUD de um usuário
class UserCRUD{
    static signUp(client, json){

        let count = 0;
        client.query('SELECT steamId FROM Usuario WHERE steamId = \''+json.steamid+'\';', (err, res) => {
            console.log(err);
            console.log(res);
        });
        if (count == 1){
            client.query('INSERT INTO Usuario VALUES(\''
            +json.steamid+'\', \''
            +json.username+'\', \''
            +json.profile+'\', \''
            +json.avatar.small+'\', \''
            +json.avatar.medium+'\', \''
            +json.avatar.large+'\');', (err, res) => {
                console.log(err);
                console.log(res);
            });
        }
    }
}

module.exports = UserCRUD;