const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true,
        unique: true
    },
    urlSource: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// Usando um hook para capturar o evento de save a criptografando a senha antes de ser cadastrada
UsersSchema.pre('save', async function(next){
    // Se a senha não for modificada va para o proximo hook, ou como ali não tem continua o codigo
    if(!this.isModified('password'))
    return next()
    
    // Caso seja a senha receberá a criptografia
    this.password = await bcrypt.hash(this.password, 8);
});

// Comparando a senha criptografada com a que o usuario digitou
UsersSchema.methods = {
    compareHash(password){
        return bcrypt.compare(password, this.password);
    }
}

// Gerando o Token para autenticação com JWT
UsersSchema.statics = {
    generateToken({id}){
        return jwt.sign({id},process.env.TOKEN_SECRET);
    }
}

mongoose.model('Users', UsersSchema);