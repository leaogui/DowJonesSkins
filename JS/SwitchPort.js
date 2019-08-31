// Função que retorna a porta de conexão, podendo ser ou do Heroku ou a local
function getPort(){
    return process.env.PORT || 7777
}

module.exports.getPort = getPort