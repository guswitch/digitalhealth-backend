console.clear();

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const pupputeer = require('puppeteer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');

require('dotenv/config');

const scraping = require('./src/app/scrapping');
const teste = require('./teste.js');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/digital_health',{ useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true });

requireDir('./src/app/models');

app.use('/api',require('./src/routes'));

io.on('connection', async (socket) => {
    console.log(`conectado ID: ${socket.id}`);
    try {
        const broswer = await pupputeer.launch();
        const page = await broswer.newPage();
        await page.goto('http://177.84.109.162:800/index_br.html');
        
        await page.type('#user', process.env.USER_MECALOR);
        await page.type('#pass', process.env.PASS_MECALOR);
        await page.click('#btnEnter');

        console.log('Page:', page.url());
        await page.waitFor(2000);

        socket.on('updateData',async () => {
            socket.broadcast.emit('updatedData',await scraping.getData(page));
        });
    } catch (error) {
        console.error(error);
    }
})

server.listen(3000, () => {
    console.log('\x1b[36m%s\x1b[0m','Server inciado em localhost:3000');
});

