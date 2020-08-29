const mongoose = require('mongoose');

const Contacts = mongoose.model('Contacts');
require('dotenv/config');

module.exports = {

    // Metodo Index
    async Index(req,res){
        const contacts = await Contacts.find();
        return res.json(contacts);
    },

    // Metodo Details
    async Details(req, res){
        const contact = await Contacts.findById(req.params.id);

        if(!contact)
        return res.status(404).json({error: 'Contact not found'});

        return res.json(contact);
    },

    // Metodo Create
    async Create(req,res){
        const { telephone } = req.body; 
        if(await Contacts.findOne({telephone}))
        return res.status(400).json({error:'Contact already exists'});

        const contact = await Contacts.create(req.body);
        return res.json(contact)
    },

    // Metodo Update
    async Update(req,res){
        const contact = await Contacts.findByIdAndUpdate(req.params.id,req.body,{new: true});
        return res.json(contact);
    },

    // Metodo Delete
    async Delete(req,res){
        const contact = await Contacts.findByIdAndDelete(req.params.id);
        return res.json({msg:'Excluido com sucesso'});
    },
}