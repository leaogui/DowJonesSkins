// importando biblioteca 'express'
const express = require('express')

// definindo função principal do express
const app = express()

// definindo path dos arquivos
var path = require('path');
app.use(express.static(__dirname))

// Definindo porta de conexão, podendo ser ou do Heroku ou a 7777
const PORT = process.env.PORT || 7777

// Trocando API Key da Steam de acordo com a PORT 
if (PORT == '7777'){
    key = 'F946785AC15BCE7B5930E5F82AE311CC'
} else {
    key = '089C83E667EAEA556A647FCAE86101ED'
}

// /importando e definindo conexão com a Steam
var steam   = require('steam-login')
app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }))
app.use(steam.middleware({
	realm: 'http://localhost:'+PORT+'/', 
	verify: 'http://localhost:'+PORT+'/'+'verify',
	apiKey: key}
))

// definindo rotas
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname,'/HTML/index.html'))
})

// rotas da conexão à Steam
app.get('/login',steam.authenticate(), (req, res) =>{
    res.redirect('/');
})

app.get('/verify', steam.verify(), function(req, res) {
    res.send(req.user).end();
});
 
app.get('/logout', steam.enforceLogin('/'), function(req, res) {
    req.logout();
    res.redirect('/');
});

// startando aplicação no gateway do Heroku
app.listen(PORT, () =>{
    console.log("Rodando")
})