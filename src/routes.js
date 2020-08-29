const express = require('express');
const scrapping = require('./app/scrapping');
const ContactsController = require('./app/controllers/ContactsController');
const routes = express.Router();
const path = require('path');

routes.get('/',(req,res)=>res.send('hello world'));

routes.get('/data', (req,res) => {
    res.sendFile(path.join(__dirname,'/app/scrapping/view.html'));
    //res.sendfile('src/app/scraping/view.html');
});

routes.get('/contacts/', ContactsController.Index);
routes.get('/contacts/:id', ContactsController.Details);
routes.post('/contacts/create', ContactsController.Create);
routes.put('/contacts/update/:id', ContactsController.Update);
routes.delete('/contacts/delete/:id', ContactsController.Delete);


module.exports = routes;