const { Expo } = require('expo-server-sdk');

const mongoose = require('mongoose');
const PushTokenController = require('../controllers/PushTokenController');
// const Problems = mongoose.model('Problems');
// const PushToken = mongoose.model('PushToken');

const Config = require('../config');

require('dotenv/config');

// async function getProblems() {
//     const problems = await Problems.find({}).exec();
//     return problems;
// }

const problems = [
    { title: 'A temperatura da Sala de Exames está muito alta', description: 'A temperatura da sala de exames está acima da média recomendada' },
    { title: 'A temperatura da Sala de Exames está muito baixa', description: 'A temperatura da sala de exames está abaixo da média recomendada' },
    { title: 'A temperatura da Sala de Técnica está muito alta', description: 'A temperatura da sala de ténica está acima da média recomendada' },
    { title: 'A temperatura da Sala de Técnica está muito baixa', description: 'A temperatura da sala de técnica está abaixo da média recomendada' },

    { title: 'A umidade Sala de Exames está muito alta', description: 'A temperatura da sala de exames está acima da média recomendada' },
    { title: 'A umidade Sala de Exames está muito baixa', description: 'A temperatura da sala de exames está acima da média recomendada' },
    { title: 'A umidade Sala de Técnica está muito alta', description: 'A temperatura da sala de exames está acima da média recomendada' },
    { title: 'A umidade Sala de Técnica está muito baixa', description: 'A temperatura da sala de exames está acima da média recomendada' },

    { title: 'A água está muito quente', description: 'A temperatura da água do tubo de fluxo está acima da média recomendada' },
    { title: 'A água está muito fria', description: 'A temperatura da água do tubo de fluxo está abaixo da média recomendada' },

    { title: 'A pressão da água está muito alta', description: 'A pressão da água do tubo de fluxo está acima da média recomendada' },
    { title: 'A pressão da água está muito baixa', description: 'A pressão da água do tubo de fluxo está abaixo da média recomendada' },

    { title: 'A vazão da água está muito baixa', description: 'A vazão da água do tubo de fluxo está abaixo da média recomendada' }
]

module.exports = {

    // pushToken: async () => {
    //     const pushToken = await PushToken.find();
    //     return pushToken;
    // },

    FilterProblem(data) {

        // const problems = getProblems().then(problems => problems).catch(err => console.error(err));
        //console.log(problems);

        let [tmpSl01,] = data[0].tmpSl01.split(' °C');
        tmpSl01 = Number(tmpSl01);

        let [umdSl01,] = data[0].umdSl01.split(' %');
        umdSl01 = Number(umdSl01);

        let [tmpSl03,] = data[1].tmpSl03.split(' °C');
        tmpSl03 = Number(tmpSl03);

        let [umdSl03,] = data[1].umdSl03.split(' %');
        umdSl03 = Number(umdSl03);

        let [tempagTF,] = data[2].tempagTF.split(' °C');
        tempagTF = Number(tempagTF);

        let [vzAlimAG,] = data[2].vzAlimAG.split(' l/min');
        vzAlimAG = Number(vzAlimAG);

        let [prsAlimAG,] = data[2].prsAlimAG.split(' bar');
        prsAlimAG = Number(prsAlimAG);




        // Temperatura sala de Exames
        if (tmpSl03 > Config.tempSalasMax)
            return problems[0];

        if (tmpSl03 < Config.tempSalasMin)
            return problems[1];

        // Temperatura sala técnica
        if (tmpSl01 > Config.tempSalasMax)
            return problems[2];

        if (tmpSl01 < Config.tempSalasMin)
            return problems[3];

        // Umidade sala técnica
        if (umdSl01 > Config.umiSalasMax)
            return problems[4];

        if (umdSl01 < Config.umiSalasMin)
            return problems[5];

        // Umidade sala de exames
        if (umdSl03 > Config.umiSalasMax)
            return problems[6];

        if (umdSl03 < Config.umiSalasMin)
            return problems[7];

        //Temperatura da agua tubo de fluxo
        if (tempagTF > Config.tempAguaMax)
            return problems[8];

        if (tempagTF < Config.tempAguaMin)
            return problems[9];

        // Pressão da agua
        if (prsAlimAG > Config.presAguaMax)
            return problems[10];

        if (prsAlimAG < Config.presAguaMin)
            return problems[11];

        // Vazão de agua
        if (vzAlimAG < Config.vzaAguaMin)
            return problems[12];

        return false

    }
    
}
