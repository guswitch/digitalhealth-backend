const { Expo } = require('expo-server-sdk');
const { tempAguaMax } = require('../config');
const ProblemsController = require('../controllers/ProblemsController');
const PushTokenController = require('../controllers/PushTokenController.');

require('dotenv/config');

let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

let messages = [];

const PushTokens = PushTokenController.Index();
const Problems = ProblemsController.Index();

/*function SelectProblem(data){
    let tmpSl01 = Number(data[0].tmpSl01.split(' °C'));
    let umdSl01 = Number(data[0].tmpSl01.split(' %'));

    let tmpSl03 = Number(data[1].tmpSl03.split(' °C'));
    let umdSl03 = Number(data[1].tmpSl03.split(' %'));

    let tempagTF = Number(data[2].tempagTF.split(' °C'));
    let vzAlimAG = Number(data[2].vzAlimAG.split(' l/min'));
    let prsAlimAG = Number(data[2].prsAlimAG.split(' bar'));

    //if(tmpSl01 > tempAguaMax)
    // retornar a mensagem

}*/

function CreateMessages(){

    for (let pushToken of PushTokens) {
        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

        // Check that all your push tokens appear to be valid Expo push tokens
        if (!Expo.isExpoPushToken(pushToken)) {
            console.error(`Push token ${pushToken} is not a valid Expo push token`);
            continue;
        }

        // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
        messages.push({
            to: pushToken,
            sound: 'default',
            body: 'This is a test notification',
            data: { withSome: 'data' },
        })
    }

}
