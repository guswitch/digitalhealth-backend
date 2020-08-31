console.clear();

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');

require('dotenv/config');

const scraping = require('./src/app/scrapping');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/digital_health',{ useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true });

requireDir('./src/app/models');

app.use('/api',require('./src/routes'));

io.on('connection',async (socket) => {
    console.log(`conectado ID: ${socket.id}`);

    //io.sockets.emit('updatingData', )
    // socket.broadcast.emit('updatingData', data);

        /* scraping.Login()
            .then(page => {
                console.log('Page:', page.url());
                scraping.getData(page)
                    .then(data => {                
                        // io.sockets.emit('updatingData', data)
                        // socket.broadcast.emit('updatingData', data);
                        socket.emit('updatingData', data);
                    }).catch(err => console.error(err));
            }).catch(err => console.error(err)); */
        
        const page = await scraping.Login();
        // socket.emit('updatingData',await scraping.getData(page))
        setInterval(async () => {
            socket.broadcast.emit('updatingData',await scraping.getData(page))
        },500)
        
});

server.listen(3000, () => {
    console.log('\x1b[36m%s\x1b[0m','Server inciado em localhost:3000');
});

