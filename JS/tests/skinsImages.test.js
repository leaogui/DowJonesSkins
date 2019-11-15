/* jshint esversion:8 */
const skinsImages = require('../Connections/Database/skinsImages');
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://pdofwwavezdugl:1339427db3bf57549fab5e03d907f45fcb88d33ea809c7cb5f19df13cad55941@ec2-107-22-160-185.compute-1.amazonaws.com:5432/dmo20daf3h6kg',
    ssl: true,
});
client.connect();

test('função deve retornar URL da foto da skin da arma informada', done => {
    var valorCorreto = 'https://i.imgur.com/n3Qk6Ko.png';
    skinsImages.getSkinsImages(['AWP | Worm God'], client).then((result)=>{
        expect(result[0]).toBe(valorCorreto);
        done();
    });
});