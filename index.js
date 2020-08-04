const express = require('express');
const path = require('path');
require('dotenv').config();

// DB Config
require('./database/config').dbConnection();


// App de Express
const app = express();

// Lectura y parseo del Body
app.use( express.json() );


// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );



// Mis Rutas
app.use( '/api/login', require('./routes/auth') );



server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});


