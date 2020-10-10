const mongoose = require('mongoose');

const Users = mongoose.model('Users')
const Token = mongoose.model('Token')

module.exports = {
    // Metodo para verificar o login
     async Store(req, res) {
        // Desestruturando o corpo da requisição
        const {username, password} = req.body;
        // Tentando achar algum usuario que tenha esse determinado username
        const user = await Users.findOne({username});
        // Verificando se foi ou não retornado algum usuario
        if(!user){
            return res.status(400).json({error:'Usuario não encontrado'});
        }
        
        if(!await user.compareHash(password)){
            return res.status(400).json({error:'Senha Invalida'});
        }

        // const token = await Token.create({_userId: user._id, token: jwt.sign({username},tokenSettings.secret,{expiresIn: tokenSettings.ttl})});
        const token = await Token.create({_userId: user._id, token: Users.generateToken(user)});

        // return res.json({user, token: User.generateToken(user)});
        return res.status(200).json({token: token.token});
    },

    async ReturnUserByToken(req,res){
        const {tokenn} = req.body;

        const tokenRes = await Token.findOne({tokenn});

        const user = await Users.findOne({_id: tokenRes._userId});

        return res.json(user.name);

    }

}