/* jshint esversion:8 */
const djsInventory = require('../Connections/Database/getDjsInventory');
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://pdofwwavezdugl:1339427db3bf57549fab5e03d907f45fcb88d33ea809c7cb5f19df13cad55941@ec2-107-22-160-185.compute-1.amazonaws.com:5432/dmo20daf3h6kg',
    ssl: true,
});
client.connect();

test('função deve retornar lista com skins do inventário do DJS', done => {
    var valorCorreto = ['Aug | Storm'];
    djsInventory.getDjsInventory('teste1', client).then((result)=>{
        expect(result[0]).toBe(valorCorreto[0]);
        done();
    });
});