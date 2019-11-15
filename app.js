/* jshint esversion:6 */
// importando biblioteca 'express' e definindo sua função principal
const express = require('express');
const app = express();

// declarando o uso da Template Engine 'handlebars'
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
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
const steam = require('steam-login');
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
const count = 5000;
const start_assetid = 730;
const language = 'pt-BR';
const tradable = true;

// Configurando sessões
const SESS_LIFETIME = 1000 * 60 * 60 * 2;
const SESS_NAME = 'steamUser';
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

// importar constants PopUp
const popUp = require('./popUpConsts');

// definindo rotas
app.get('/', (req, res) => {
    if (!req.session.user) {
        res.render('index');
    } else {
        const carteira = require('./JS/Connections/Database/getSaldo');
        carteira.getSaldo(req.session.user.steamid, client).then((saldo) => {
            res.render('index-logged', { saldo: saldo });
        });
    }
});

app.get('/index', (req, res) => {
    if (!req.session.user) {
        res.render('index');
    } else {
        const carteira = require('./JS/Connections/Database/getSaldo');
        carteira.getSaldo(req.session.user.steamid, client).then((saldo) => {
            res.render('index-logged', { saldo: saldo });
        });
    }
});

app.get('/daytrade', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        const skinsImages = require('./JS/Connections/Database/skinsImages');
        const allInvestimentos = require('./JS/Connections/Database/getAllInvestimentos');
        const ofertasPrice = require('./JS/Connections/Database/getOfertasPrice');
        const myInvestimentos = require('./JS/Connections/Database/getMyInvestimentos');
        const getData = require('./JS/Connections/Database/getData');
        const getHist = require('./JS/Connections/Database/getHistorico');
        const carteira = require('./JS/Connections/Database/getSaldo');
        const myPrice = require('./JS/Connections/Database/getMySkinsPrice');
        allInvestimentos.getAllInvestimentos(req.session.user.steamid, client).then(ofertasNome => {
            skinsImages.getSkinsImages(ofertasNome, client).then(ofertasImagens => {
                ofertasPrice.getOfertasPrice(ofertasNome, client).then(precoSkins => {
                    myInvestimentos.getMyInvestimentos(req.session.user.steamid, client).then(myList => {
                        myPrice.getMySkinsPrice(req.session.user.steamid, client).then(myPriceList =>{
                            skinsImages.getSkinsImages(myList, client).then(myImages => {
                                getData.getData(myList, req.session.user.steamid, client).then(dataList => {
                                    getHist.getHistorico(req.session.user.steamid, client).then(historicoList => {
                                        carteira.getSaldo(req.session.user.steamid, client).then((saldo) => {
                                            res.render('daytrade-logged', {
                                                precoSkins: precoSkins,
                                                myList: myList,
                                                myPrice: myPriceList,
                                                myImages: myImages,
                                                dataList: dataList,
                                                ofertasImagens: ofertasImagens,
                                                ofertasNome: ofertasNome,
                                                ofertasPrice: ofertasPrice,
                                                historicoList: historicoList,
                                                saldo: saldo
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
});

app.get('/perfil', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        const carteira = require('./JS/Connections/Database/getSaldo');
        carteira.getSaldo(req.session.user.steamid, client).then((saldo) => {
            res.render('perfil', { saldo: saldo });
        });
    }
});

app.get('/listaskins', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
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
            const skinsImages = require('./JS/Connections/Database/skinsImages');
            const skinsInvestidas = require('./JS/Connections/Database/getInvestimentos');
            const carteira = require('./JS/Connections/Database/getSaldo');
            const skinsPrice = require('./JS/Connections/Database/getDJSSkinsPrice');
            steamList = inventorySkins.getInventorySkins(result.items.map(item => item.market_hash_name));
            tradableSkins.getTradableSkins(req.session.user.steamid, steamList, client).then(tradableList => {
                skinsImages.getSkinsImages(tradableList, client).then(skinImages => {
                    djsInventory.getDjsInventory(req.session.user.steamid, client).then(djsList => {
                        skinsPrice.getDJSSkinsPrice(req.session.user.steamid, client).then(skinsPrice =>{
                            skinsImages.getSkinsImages(djsList, client).then(djsImages => {
                                skinsInvestidas.getInvestimentos(djsList, req.session.user.steamid, client).then(investimentoList => {
                                    carteira.getSaldo(req.session.user.steamid, client).then((saldo) => {
                                        res.render('listaskins', {
                                            user: req.session.user.username,
                                            steamList: steamList,
                                            tradableList: tradableList,
                                            skinImages: skinImages,
                                            djsList: djsList,
                                            skinsPrice: skinsPrice,
                                            djsImages: djsImages,
                                            investimentoList: investimentoList,
                                            saldo: saldo
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
});

app.get('/gerenciador-carteira', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        const carteira = require('./JS/Connections/Database/getSaldo');
        carteira.getSaldo(req.session.user.steamid, client).then((saldo) => {
            res.render('carteira', { saldo: saldo });
        });
    }
});

// rotas para depósitar, retirar e investir skins e dinheiro
app.get('/depositar', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        const depositSkin = require('./JS/Connections/Database/depositSkin');
        depositSkin.depositSkin(client, req.query.skin, req.session.user.steamid).then(
            res.render('listaskins', {popUp: popUp.popUpDepositarSkin})
        );
    }
});

app.get('/retirar', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        const retirarSkin = require('./JS/Connections/Database/retirarSkin');
        retirarSkin.retirarSkin(client, req.query.skin, req.session.user.steamid).then(
            res.render('listaskins', {popUp: popUp.popUpSacarSkin})
        );
    }
});

app.get('/investir', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        const investirSkin = require('./JS/Connections/Database/investirSkin');
        investirSkin.investirSkin(client, req.query.skin, req.session.user.steamid).then(
            res.render('listaskins', {popUp: popUp.popUpInvestimento})
        );
    }
});

app.get('/retirarInvestimento', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        const retirarInvestimento = require('./JS/Connections/Database/retirarInvestimento');
        retirarInvestimento.retirarInvestimento(client, req.query.skin, req.session.user.steamid).then(
            res.render('daytrade-logged', {popUp: popUp.popUpRetirarInvestimento})
        );
    }
});

app.get('/comprarSkin', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        const comprarSkin = require('./JS/Connections/Database/comprarSkin');
        comprarSkin.comprarSkin(client, req.query.skin, req.session.user.steamid).then((result) =>{
            if (result == true)
                res.render('daytrade-logged', {popUp: popUp.popUpCompraGreen});
            else
                res.render('daytrade-logged', {popUp: popUp.popUpCompraRed});
        });
    }
});

app.get('/depositar-carteira', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        const depositarCarteira = require('./JS/Connections/Database/depositarCarteira');
        depositarCarteira.depositarCarteira(req.session.user.steamid, client).then(
            res.render('carteira', {popUp: popUp.popUpDeposito})
        );
    }
});

app.get('/sacar-carteira', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        const sacarCarteira = require('./JS/Connections/Database/sacarCarteira');
        sacarCarteira.sacarCarteira(req.query.qtd, req.session.user.steamid, client).then((result) =>{
            if (result == true)
                res.render('carteira', {popUp: popUp.popUpSaqueGreen});
            else
                res.render('carteira', {popUp: popUp.popUpSaqueRed});
        });
    }
});

// rotas da conexão à Steam
app.get('/login', steam.authenticate(), (req, res) => {
    res.redirect('/');
});

app.get('/verify', steam.verify(), function (req, res) {
    const json = req.user;
    console.log(json);
    const UserCRUD = require('./JS/Connections/Database/signUp');
    UserCRUD.signUp(client, json).then(() => {
        req.session.user = json;
        res.cookie('steamjson', JSON.stringify(json));
        res.redirect('/');
    });
});

app.get('/logout', steam.enforceLogin('/'), function (req, res) {
    if (!req.session.user) {
        res.redirect('/');
    } else {
        req.logout();
        res.clearCookie(SESS_NAME);
        req.session.destroy();
        res.redirect('/');
    }
});

// startando aplicação no gateway selecionado
app.listen(PORT, () => {
    console.log("Rodando");
    console.log('Porta: ' + PORT);
    console.log('API Key: ' + key);
});