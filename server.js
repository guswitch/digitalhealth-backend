console.clear();

// Dependencias
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server);
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { default: Axios } = require('axios');
const requireDir = require('require-dir');

// Importando aquivo .env
require('dotenv/config');

//  Permitindo uso de json na API
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Adicionando CORS básico, qualquer um pode acessar
app.use(cors());

// Conectando DB
mongoose.connect('mongodb://localhost:27017/digital_health', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// Importando todos os models de uma só vez 
requireDir('./src/app/models');

// Usando alguns models
const Notifications = mongoose.model('Notifications');

// Importando arquivos do webscraping e método de filtragem de problemas
const scraping = require('./src/app/scrapping');
const { FilterProblem } = require('./src/app/notifications');

// Configurando API para conseguir usar um retorno em uma view 
app.use(express.static(path.join(__dirname, 'src/public')));
app.set('views', path.join(__dirname, 'src/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Declarando o arquivo de rotas
app.use('/api', require('./src/routes'));

// Usando o socket.io para estabelcer conexão 
io.on('connection', async (socket) => {
    console.log(`conectado ID: ${socket.id}`);

    // Realizar Login com o web scraping
    const page = await scraping.Login();

    // Variavel de controle para envio de notificações
    let problemTriggerStatus = false;

    // Intervalo para a atualização dos dados e filtragem dos mesmos
    setInterval(async () => {

        let data = await scraping.getData(page);
        socket.emit('updatingData', data);
        let problem = FilterProblem(data);

        // Verificacão se existe um problema
        if (problem !== false && problemTriggerStatus == false) {

            problemTriggerStatus = true;
             await Notifications.create(problem);

            /* socket.emit('Teste',problem); */

            // Emissão de notificação para a API do expo-notification
            return await Axios.post('https://exp.host/--/api/v2/push/send',
                {
                    to: "ExponentPushToken[fkVl3gK2xaBCiT0SmPpMnx]",
                    title: problem.title,
                    body: problem.description
                },
                {
                    headers: {
                        Accept: 'application/json',
                        'Accept-Encoding': 'gzip, deflate',
                        'Content-Type': 'application/json'
                    }
                });
              
        }

    }, 1000);
    
});

server.listen(3000, () => {
    console.log('\x1b[36m%s\x1b[0m', 'Server inciado em localhost:3000');
});

