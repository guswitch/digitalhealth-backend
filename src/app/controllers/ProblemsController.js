const mongoose = require('mongoose');

const Problems = mongoose.model('Problems');
require('dotenv/config');

module.exports = {

    // Metodo Index
    async Index(req,res){
        const problems = await Problems.find();
        return res.json(problems);
    },

    // Metodo Details
    async Details(req, res){
        const problem = await Problems.findById(req.params.id);

        if(!problem)
        return res.status(404).json({error: 'problem not found'});

        return res.json(problem);
    },

    // Metodo Create
    async Create(req,res){
        const problem = await Problems.create(req.body);
        return res.json(problem)
    },

    // Metodo Update
    async Update(req,res){
        const problem = await Problems.findByIdAndUpdate(req.params.id,req.body,{new: true});
        return res.json(problem);
    },

    // Metodo Delete
    async Delete(req,res){
        const problem = await Problems.findByIdAndDelete(req.params.id);
        return res.json({msg:'Excluido com sucesso'});
    },
}