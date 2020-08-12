const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router = require('./Router');
const SocketHandling = require('./SocketHandling'); // used to handle chat sockets

//https

// const https = require('https');
// const fs = require('fs');
// var privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
// var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
// var credentials = {key: privateKey, cert: certificate};

// Serve Build Folder

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'phpmyadmin',
    password: 'arrowhead',  // enter your password here
    database: 'logindemo'
})

db.connect(function(err) {
    if(err)
    {
        console.log('DB Error');
        throw(err);
    }
});

// Session Store

const sessionStore = new MySQLStore({
    expiration: (1825 * 86400 * 1000),  // expire session in 5 years (lol)
    endConnectionOnClose: false
}, db);

app.use(session({
    key: '546jl6543jlk3654ljkn3546njkl',
    secret: "n5647njk3645njk654njk3k654jnl3546564k",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 86400 * 1000),
        httpOnly: false
    }
}))

// Router

new Router(app, db); //cloud based router

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



//https stuff again below
app.listen(3000);

// var httpsServer = https.createServer(credentials, app);
// httpsServer.listen(3000);

// chat socket

SocketHandling();