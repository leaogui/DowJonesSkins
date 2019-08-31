// importando biblioteca 'express' e definindo sua função principal
const express = require('express')
const app = express()

// definindo path dos arquivos
const path = require('path');
app.use(express.static(__dirname))

// Definindo porta de conexão
const switchPort = require('./JS/SwitchPort')
const PORT = switchPort.getPort()

// Selecionando Steam API Key
const switchSteamKey = require('./JS/SwitchSteamKey')
const key = switchSteamKey.getKey(PORT)

// importando e definindo conexão com a Steam
const steam   = require('steam-login')
const switchSteamConnection = require('./JS/SwitchSteamConnection')
switchSteamConnection.getConnection(app, steam, PORT)

// definindo rotas
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname,'/HTML/index.html'))
})

app.get('/index.html', (req, res) =>{
    res.sendFile(path.join(__dirname,'/HTML/index.html'))
})

// rotas da conexão à Steam
app.get('/login',steam.authenticate(), (req, res) =>{
    res.redirect('/');
})

app.get('/verify', steam.verify(), function(req, res) {
    //res.send(req.user).end();
    res.redirect('/');
});
 
app.get('/logout', steam.enforceLogin('/'), function(req, res) {
    req.logout();
    res.redirect('/');
});

// startando aplicação no gateway selecionado
app.listen(PORT, () =>{
    console.log("Rodando")
    console.log ('Porta: ' + PORT)
    console.log ('API Key: ' + key)
})