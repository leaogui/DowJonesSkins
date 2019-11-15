/* jshint esversion:8 */
const depositarCarteira = require('../Connections/Database/depositarCarteira');
const getSaldo = require('../Connections/Database/getSaldo');
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://pdofwwavezdugl:1339427db3bf57549fab5e03d907f45fcb88d33ea809c7cb5f19df13cad55941@ec2-107-22-160-185.compute-1.amazonaws.com:5432/dmo20daf3h6kg',
    ssl: true,
});
client.connect();

test('função deve depositar R$15.00 na carteira do usuario informado', done => {
    getSaldo.getSaldo('teste1', client).then((preResult)=>{
        depositarCarteira.depositarCarteira('teste1', client).then(()=>{
            getSaldo.getSaldo('teste1', client).then((newResult)=>{
                expect(parseFloat(newResult[0])).toBe(parseFloat(preResult[0])+15);
                done();
            });
        });
    });
});