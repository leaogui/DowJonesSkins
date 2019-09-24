/* jshint esversion:6 */
// importando biblioteca 'express' e definindo sua função principal
const express = require('express');
const app = express();

// importando bibliotecas para criação de sessão
const session = require('express-session');
const flash = require('connect-flash');

// definindo path dos arquivos
const path = require('path');
app.use(express.static(__dirname));

// Definindo porta de conexão
const SwitchPort = require('./JS/Connections/Steam/SwitchPort');
const PORT = SwitchPort.getPort();

// Selecionando Steam API Key
const SwitchSteamKey = require('./JS/Connections/Steam/SwitchSteamKey');
const key = SwitchSteamKey.getKey(PORT);

// importando e definindo conexão com a Steam
const steam   = require('steam-login');
const SwitchSteamConnection = require('./JS/Connections/Steam/SwitchSteamConnection');
SwitchSteamConnection.getConnection(app, steam, PORT, key);

// Conectando ao banco de dados do Heroku
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://pdofwwavezdugl:1339427db3bf57549fab5e03d907f45fcb88d33ea809c7cb5f19df13cad55941@ec2-107-22-160-185.compute-1.amazonaws.com:5432/dmo20daf3h6kg',
    ssl: true,
});

client.connect();

// Configurando sessões
app.use(session({
    secret: '777skrr',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.erro_msg = req.flash("erro_msg");
    next();
});

// definindo rotas
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname,'/HTML/index.html'));
});

app.get('/index.html', (req, res) =>{
    res.sendFile(path.join(__dirname,'/HTML/index.html'));
});

app.get('/fairtrade.html', (req, res) =>{
    res.sendFile(path.join(__dirname,'/HTML/fairtrade.html'));
});

app.get('/perfil.html', (req, res) =>{
    res.sendFile(path.join(__dirname,'/HTML/perfil.html'));
});

app.get('/listaskins.html', (req, res) =>{
    res.sendFile(path.join(__dirname,'/HTML/listaskins.html'));
});

// rotas da conexão à Steam
app.get('/login',steam.authenticate(), (req, res) =>{
    res.redirect('/');
});

app.get('/verify', steam.verify(), function(req, res) {
    const json = req.user;
    console.log(json);
    const UserCRUD = require('./JS/Connections/Database/UserCRUD');
    UserCRUD.signUp(client, json);
    res.redirect('/');
});
 
app.get('/logout', steam.enforceLogin('/'), function(req, res) {
    req.logout();
    client.end();
    res.redirect('/');
});

// startando aplicação no gateway selecionado
app.listen(PORT, () =>{
    console.log("Rodando");
    console.log ('Porta: ' + PORT);
    console.log ('API Key: ' + key);
});