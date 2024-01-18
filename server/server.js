const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors= require('cors');
const { setRoutes } = require('./config/routes');
require('./config/database');
const port=5000;
const server = express();

server.use(helmet());
server.use(cors({'origin':'http://localhost:4200',methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],credentials: true,}));
server.use(bodyParser.json());

setRoutes(server);

server.listen(port).on('error', (err) => {
    console.log('✘ Application failed to start');
    console.error('✘', err.message);
    process.exit(0);
}).on('listening', () => {
    console.log('✔ Application Started on port ',port);
});
