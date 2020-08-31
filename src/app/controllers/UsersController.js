const mongoose = require('mongoose');
const { generatePin } = require('generate-pin');

const User = mongoose.model('Users');
const Pin = mongoose.model('Pin');

require('dotenv/config');

module.exports = {  

    async Register(req,res){
        const { telephone } = req.body; 
        if(await User.findOne({telephone}))
        return res.status(400).json({error:'Usuario já existente'});

        const user = await User.create(req.body);

        return res.json(user)
    },

    async ResendPin(req,res){
        const {telephone} = req.body;

        User.findOne({telephone: req.body.telephone},(error,user)=>{
            if(!user)
            return res.status(400).json({error:'Nenhum usuario foi encontrado com esse número'});

            if(user.isVerified)
            return res.status(400).json({error:'Essa conta já foi verificada'});

        });

    },

    async ComparePin(req,res){
        const {pin,telephone} = req.body;
        const user = await User.findOne({telephone});
        const Pins = await Pin.findOne({_userId: user._id});
        
        if(Pins.pin == pin)
        return res.json(true);

        return res.json(false);
    },

    async Profile(req, res){
        const user = await User.findById(req.params.id);

        if(!user)
        return res.status(404).json({error: 'Usuario não encontrado'});

        return res.json(user);
    },

    async UpdateProfile(req,res){
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new: true});
        return res.json(user);
    },

    async DeleteProfile(req,res){
        const user = await User.findByIdAndDelete(req.params.id);
        return res.send({msg:'Excluido com sucesso'});
    },
}