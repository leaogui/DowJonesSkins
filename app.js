/* jshint esversion:6 */
// importando biblioteca 'express' e definindo sua função principal
const express = require('express');
const app = express();

// importando bibliotecas para criação de sessão
const session = require('express-session');

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

// Configurando steam-inventory-api
const InventoryApi = require('steam-inventory-api');
const inventoryApi = Object.create(InventoryApi);

inventoryApi.init({
    id: 'invSteam',
    proxyRepeat: 1,
    maxUse: 25,
    requestInterval: 60 
});

const contextid = 2;
const appid = 730;
const count = 5000
const start_assetid = 730;
const language = 'pt-BR';
const tradable = true;

// Configurando sessões
const SESS_LIFETIME = 1000 * 60 * 60 * 2;
const SESS_NAME = 'steamUser'
app.use(session({
    name: SESS_NAME,
    secret: 'djw',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: true
    }
}));
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

// definindo rotas
app.get('/', (req, res) =>{
    if (!req.session.user){
        res.sendFile(path.join(__dirname,'/HTML/index.html'));
    } else{
        res.sendFile(path.join(__dirname,'/HTML/index-logged.html'));
    }
});

app.get('/index.html', (req, res) =>{
    if (!req.session.user){
        res.sendFile(path.join(__dirname,'/HTML/index.html'));
    } else{
        res.sendFile(path.join(__dirname,'/HTML/index-logged.html'));
    }
});

app.get('/daytrade.html', (req, res) => {
    res.sendFile(path.join(__dirname,'/HTML/daytrade.html'));
});

app.get('/fairtrade.html', (req, res) =>{
    if (!req.session.user){
        res.redirect('/login');
    } else{
        res.sendFile(path.join(__dirname,'/HTML/fairtrade.html'));
    }
});

app.get('/perfil.html', (req, res) =>{
    if (!req.session.user){
        res.redirect('/login');
    } else{
        res.sendFile(path.join(__dirname,'/HTML/perfil.html'));
    }
});

app.get('/listaskins.html', (req, res) =>{
    if (!req.session.user){
        res.redirect('/login');
    } else{
        res.sendFile(path.join(__dirname,'/HTML/listaskins.html'));
    }
});

// rotas da conexão à Steam
app.get('/login',steam.authenticate(), (req, res) =>{
    res.redirect('/');
});

app.get('/verify', steam.verify(), function(req, res) {
    const json = req.user;
    console.log(json);
    const steamid = json.steamid;

    inventoryApi.get({
        appid,
        contextid,
        steamid,
        start_assetid,
        count,
        language,
        tradable
    }).then((res) => {
        console.log('Total itens: ',res.total);
        console.log('Itens: ', JSON.stringify(res.items.map (item => item.market_hash_name),null, 4));
    });

    const UserCRUD = require('./JS/Connections/Database/UserCRUD');
    UserCRUD.signUp(client, json);
    req.session.user = json;
    res.cookie('steamjson', JSON.stringify(json));
    res.redirect('/');
});
 
app.get('/logout', steam.enforceLogin('/'), function(req, res) {
    if (!req.session.user){
        res.redirect('/');
    } else{
        req.logout();
        res.clearCookie(SESS_NAME);
        req.session.destroy();
        res.redirect('/');
    }
});

// startando aplicação no gateway selecionado
app.listen(PORT, () =>{
    console.log("Rodando");
    console.log ('Porta: ' + PORT);
    console.log ('API Key: ' + key);
});