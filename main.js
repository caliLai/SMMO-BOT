/*****************************************************************
    PROJECT:
        SMMO-BOT
    DESCRIPTION:
        SMMO-BOT is a Discord bot made to ping players 5 minutes before a
        world boss is attackable. The world boss is applicable to the game
        "SimpleMMO".

    Developed by Calista Lai
    Dec 2020 / Jan 2021
    Send me coffee pls
*****************************************************************/

//----- MODULES-----//
require("dotenv").config();
const axios = require("axios"),
// Discord = require("discord.js"),
smmoHandler = require("./SMMO_handler.js");
dcHandler = require("./DC_handler.js");

//------SMMO STUFF-----//
const SMMO_apiKey = process.env.SMMO_TOKEN,
    SMMO_wbURL = "https://api.simple-mmo.com/v1/worldboss/all";

//-----OH BOY, FUN STUFF STARTS HERE-----//

// make a HTTP POST request to SMMO
const wbPing = () => {
    axios.post(SMMO_wbURL, {api_key: SMMO_apiKey})
        .then(res => {
            return new Promise((resolve, reject) => {
                let now = new Date().getTime(); // current time
                // console.log(res.data)
                let bosses_time = res.data
                    // .filter(boss => boss.enable_time - (now/1000) > 0)
                    .filter(boss => boss.enable_time - (now/1000) <= 3600)
                    .map(boss => boss.enable_time - (now/1000));
                //console.log(res.data.filter(boss => boss.enable_time - (now/1000) <= 14400))
                //console.log(bosses_time);
                //let bosses_attack = bosses_time.filter(time => time > 0);
                //console.log(bosses_attack);
                if(bosses_time.length != 0){
                    bosses_time = bosses_time.sort();
                    console.log("Bosses attackable Soon")
                    resolve(bosses_time);
                    // resolve([60, 120]);
                }
                reject("no bossess attackable soon");
            })
        })
        .then(times => {
            const newTimes = times.map(time => {
                //let t = time;
                if (time <= 300){
                    return time;
                }
                return time - 300;
            })

            for(time of newTimes){
                dcHandler.countDown(
                    time * 1000,
                    // 1000,
                    "791497108351615049",
                    "793438432646135808",
                    `WB in ${parseInt(time/60)} mins`);
            }
        })
        .catch(err => console.log(err));
}
wbPing();
setInterval(wbPing, 3600000);
// wbPing();
