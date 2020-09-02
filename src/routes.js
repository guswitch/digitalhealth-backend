const express = require('express');
const scrapping = require('./app/scrapping');
const ContactsController = require('./app/controllers/ContactsController');
const UsersController = require('./app/controllers/UsersController');
const SessionController = require('./app/controllers/SessionController');
const routes = express.Router();
const path = require('path');

routes.get('/',(req,res)=>res.send('hello world'));

routes.get('/data', (req,res) => {
    res.render('view.html')
});

routes.get('/contacts/', ContactsController.Index);
routes.get('/contacts/:id', ContactsController.Details);
routes.post('/contacts/create', ContactsController.Create);
routes.put('/contacts/update/:id', ContactsController.Update);
routes.delete('/contacts/delete/:id', ContactsController.Delete);

routes.get('/users/:id', UsersController.Profile);
routes.post('/users/create', UsersController.Register);
routes.put('/users/update/:id', UsersController.UpdateProfile);
routes.delete('/users/delete/:id', UsersController.DeleteProfile);

routes.post('/session', SessionController.Store);

module.exports = routes;