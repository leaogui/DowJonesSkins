/* jshint esversion:6 */
// Classe que retorna a porta de conexão, podendo ser ou do Heroku ou a local
class SwitchPort{
    static getPort(){
        return process.env.PORT || 7777;
    }
}

module.exports = SwitchPort;