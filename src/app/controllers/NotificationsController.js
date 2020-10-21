const mongoose = require('mongoose');

const Notifications = mongoose.model('Notifications');
require('dotenv/config');

module.exports = {

    // Metodo Index
    async Index(req,res){
        const notifications = await Notifications.find();
        return res.json(notifications);
    },

    // Metodo Details
    async Details(req, res){
        const notification = await Notifications.findById(req.params.id);

        if(!notification)
        return res.status(404).json({error: 'notification not found'});

        return res.json(notification);
    },

    // Metodo Create
    async Create(req,res){
        const notification = await Notifications.create(req.body);
        return res.json(notification)
    },

    // Metodo Update
    async Update(req,res){
        const notification = await Notifications.findByIdAndUpdate(req.params.id,req.body,{new: true});
        return res.json(notification);
    },

    // Metodo Delete
    async Delete(req,res){
        const notification = await Notifications.findByIdAndDelete(req.params.id);
        return res.json({msg:'Excluido com sucesso'});
    },
}