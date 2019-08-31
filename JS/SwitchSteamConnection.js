function getConnection(app, steam, PORT){
    if (PORT == '7777'){
        app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }))
        app.use(steam.middleware({
            realm: 'http://localhost:'+PORT+'/', 
            verify: 'http://localhost:'+PORT+'/'+'verify',
            apiKey: key}
        ))
    } else {
        app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }))
        app.use(steam.middleware({
            realm: 'https://dow-jones-skins.herokuapp.com/', 
            verify: 'https://dow-jones-skins.herokuapp.com/verify',
            apiKey: key}
        ))
    }
}

module.exports.getConnection = getConnection