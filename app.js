/* jshint esversion:6 */
// importando biblioteca 'express' e definindo sua função principal
const express = require('express');
const app = express();

// declarando o uso da Template Engine 'handlebars'
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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
        res.render('index');
    } else{
        res.render('index-logged');
    }
});

app.get('/index', (req, res) =>{
    if (!req.session.user){
        res.render('index');
    } else{
        res.render('index-logged');
    }
});

app.get('/daytrade', (req, res) => {
    if (!req.session.user){
        res.render('daytrade');
    } else{
        res.render('daytrade-logged');
    }
});

app.get('/fairtrade', (req, res) =>{
    if (!req.session.user){
        res.redirect('/login');
    } else{
        res.render('fairtrade');
    }
});

app.get('/perfil', (req, res) =>{
    if (!req.session.user){
        res.redirect('/login');
    } else{
        res.render('perfil');
    }
});

app.get('/listaskins', (req, res) =>{
    if (!req.session.user){
        res.redirect('/login');
    } else{
        const steamid = req.session.user.steamid;
        inventoryApi.get({
            appid,
            contextid,
            steamid,
            start_assetid,
            count,
            language,
            tradable
        }).then((result) => {
            const inventorySkins = require('./JS/scripts/inventorySkins');
            const tradableSkins = require('./JS/Connections/Database/tradableSkins');
            const djsInventory = require('./JS/Connections/Database/getDjsInventory');
            steamList = inventorySkins.getInventorySkins(result.items.map (item => item.market_hash_name));
            tradableSkins.getTradableSkins(req.session.user.steamid, steamList, client).then(tradableList => {
                const skinsImages = require('./JS/Connections/Database/skinsImages');
                skinsImages.getSkinsImages(tradableList, client).then(skinImages => {
                    djsInventory.getDjsInventory(req.session.user.steamid, client).then(djsList =>{
                        skinsImages.getSkinsImages(djsList, client).then(djsImages => {
                            res.render('listaskins', { user: req.session.user.username, 
                                steamList: steamList, 
                                tradableList: tradableList, 
                                skinImages: skinImages, 
                                djsList: djsList,
                                djsImages:djsImages
                            });
                        });
                    });
                });
            });
        });
    }
});

// rota para depósito e retirada de skins do site
app.get('/deposit', (req, res) =>{
    if (!req.session.user){
        res.redirect('/login');
    } else{
        const depositSkin = require('./JS/Connections/Database/depositSkin');
        depositSkin.depositSkin(client, req.query.skin, req.session.user.steamid).then((result) =>{
            res.redirect('listaskins');
        });
    }
});

app.get('/retirar', (req, res) =>{
    if (!req.session.user){
        res.redirect('/login');
    } else{
        const retirarSkin = require('./JS/Connections/Database/retirarSkin');
        retirarSkin.retirarSkin(client, req.query.skin, req.session.user.steamid).then(res.redirect('listaskins'));
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