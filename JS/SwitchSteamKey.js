// Função que seleciona API Key da Steam de acordo com a PORT da conexão
function getKey (PORT){
    if (PORT == '7777'){ // Key da porta 7777
        key = 'F946785AC15BCE7B5930E5F82AE311CC'
    } else { // Key do Heroku
        key = '089C83E667EAEA556A647FCAE86101ED'
    }
    return key
}

module.exports.getKey = getKey