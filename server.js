console.clear();

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server);
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');


require('dotenv/config');

const scraping = require('./src/app/scrapping');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

mongoose.connect('mongodb://localhost:27017/digital_health',{ useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true });

requireDir('./src/app/models');

app.use(express.static(path.join(__dirname, 'src/public')));
app.set('views',path.join(__dirname, 'src/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/api',require('./src/routes'));

io.on('connection',async (socket) => {
    console.log(`conectado ID: ${socket.id}`);
    const page = await scraping.Login();
    setInterval(async () => {
        socket.emit('updatingData',await scraping.getData(page))
        // socket.broadcast.emit('updatingData',await scraping.getData(page))
    },1000);
});

server.listen(3000, () => {
    console.log('\x1b[36m%s\x1b[0m','Server inciado em localhost:3000');
});

