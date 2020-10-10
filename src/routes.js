const express = require('express');
const scrapping = require('./app/scrapping');

const ContactsController = require('./app/controllers/ContactsController');
const UsersController = require('./app/controllers/UsersController');
const SessionController = require('./app/controllers/SessionController');
const ProblemsController = require('./app/controllers/ProblemsController');
const PushTokenController = require('./app/controllers/PushTokenController.');

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

routes.get('/problems/', ProblemsController.Index);
routes.get('/problems/:id', ProblemsController.Details);
routes.post('/problems/create', ProblemsController.Create);
routes.put('/problems/update/:id', ProblemsController.Update);
routes.delete('/problems/delete/:id', ProblemsController.Delete);

routes.get('/pushtoken/', PushTokenController.Index);
routes.get('/pushtoken/:id', PushTokenController.Details);
routes.post('/pushtoken/create', PushTokenController.Create);
routes.put('/pushtoken/update/:id', PushTokenController.Update);
routes.delete('/pushtoken/delete/:id', PushTokenController.Delete);

routes.post('/session', SessionController.Store);

module.exports = routes;