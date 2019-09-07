//Classe responsável pelas operações CRUD de um usuário
class UserCRUD{
    static signUp(client, json){

        let count = 1;
        client.query('SELECT steamId FROM Usuario WHERE steamId = \''+json.steamid+'\';', (err, res) => {
            if (err == null){
                count = res.rowCount;
            } else{
                console.log(err);
            }
            
        });
        if (count == 0){
            client.query('INSERT INTO Usuario VALUES(\''
            +json.steamid+'\', \''
            +json.username+'\', \''
            +json.profile+'\', \''
            +json.avatar.small+'\', \''
            +json.avatar.medium+'\', \''
            +json.avatar.large+'\');', (err, res) => {
                if (err == null){
                    console.log(res);
                } else{
                    console.log(err);
                }
            });
        }
    }
}

module.exports = UserCRUD;