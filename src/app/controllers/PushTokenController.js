const mongoose = require('mongoose');

const PushToken = mongoose.model('PushToken');
require('dotenv/config');

module.exports = {

    // Metodo Index
    async Index(req,res){
        const pushtokens = await PushToken.find();
        return res.json(pushtokens);
    },

    // Metodo Details
    async Details(req, res){
        const pushtoken = await PushToken.findById(req.params.id);

        if(!pushtoken)
        return res.status(404).json({error: 'Token not found'});

        return res.json(pushtoken);
    },

    // Metodo Create
    async Create(req,res){
        const { push_token } = req.body; 
        if(await PushToken.findOne({push_token}))
        return res.status(400).json({error:'Token already exists'});

        const pushtoken = await PushToken.create(req.body);
        return res.json(pushtoken)
    },

    // Metodo Update
    async Update(req,res){
        const pushtoken = await PushToken.findByIdAndUpdate(req.params.id,req.body,{new: true});
        return res.json(pushtoken);
    },

    // Metodo Delete
    async Delete(req,res){
        const pushtoken = await PushToken.findByIdAndDelete(req.params.id);
        return res.json({msg:'Excluido com sucesso'});
    },
}