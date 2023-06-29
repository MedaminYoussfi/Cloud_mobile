/*
const  http = require ('http') ;


const server = http.createServer ((req, res) => {
    res.end('bonjour ted university');
}) ;

server.listen(process.env.PORT || 3000 ) ;

const app = require ('./app')
*/


const  http = require ('http') ;
const app = require ('./app') ;
app.set('port',process.env.PORT || 3000) ;
const server = http.createServer(app);
server.listen(process.env.PORT || 3000 ) ;






