const mongoose = require('mongoose');

const Users = mongoose.model('Users');

require('dotenv/config');

module.exports = {  

    async Register(req,res){
        const { username } = req.body; 
        if(await Users.findOne({username}))
        return res.status(400).json({error:'Usuario já existente'});

        const user = await Users.create(req.body);

        return res.json(user)
    },

    async Profile(req, res){
        const user = await Users.findById(req.params.id);

        if(!user)
        return res.status(404).json({error: 'Usuario não encontrado'});

        return res.json(user);
    },

    async UpdateProfile(req,res){
        const user = await Users.findByIdAndUpdate(req.params.id,req.body,{new: true});
        return res.json(user);
    },

    async DeleteProfile(req,res){
        const user = await Users.findByIdAndDelete(req.params.id);
        return res.send({msg:'Excluido com sucesso'});
    },
}