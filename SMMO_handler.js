/*****************************************************************
    PROJECT:
        SMMO-BOT
    DESCRIPTION:
        Module for any functions related to the SMMO side of things

    Developed by Calista Lai
    Dec 2020
    Send me coffee pls
*****************************************************************/



/***
 Function description:
    Check to see if a boss is attackable in 5 minutes. If so,
    resolve with the boss's name
***/
const attackInFive = (res) => {
    return new Promise((resolve, reject) => {
        let now = new Date().getTime(); // current time
        for(boss of res.data){
            // note that enable_time is in seconds and now is in miliseconds
            if(boss.enable_time - (now/1000) < 7200){
                resolve(boss.name);
            }
        }
        reject("No bosses attackable soon");
    })
}

module.exports = {
    attackInFive
}
