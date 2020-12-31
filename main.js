/*****************************************************************
    PROJECT:
        SMMO-BOT
    DESCRIPTION:
        SMMO-BOT is a Discord bot made to ping players 5 minutes before a
        world boss is attackable. The world boss is applicable to the game
        "SimpleMMO".

    Developed by Calista Lai
    Dec 2020
    Send me coffee pls
*****************************************************************/
/***
    SMMO-BOT is a Discord bot made to ping players 5 minutes before a world
    boss is attackable. The world boss is applicable to the game "SimpleMMO".

    Developed by Calista Lai
    Dec 2020
    I have no damn clue what I'm doing
***/


//----- MODULES-----//
require("dotenv").config();
const axios = require("axios"),
// Discord = require("discord.js"),
smmoHandler = require("./SMMO_handler.js");
dcHandler = require("./DC_handler.js");

//-----DC STUFF-----//
// const bot = new Discord.Client();
// const DC_TOKEN = process.env.DC_TOKEN;

//------SMMO STUFF-----//
const SMMO_apiKey = process.env.SMMO_TOKEN,
    SMMO_wbURL = "https://api.simple-mmo.com/v1/worldboss/all";

//-----OH BOY, FUN STUFF STARTS HERE-----//
// bot.login(DC_TOKEN);

// make a HTTP POST request to SMMO
axios.post(SMMO_wbURL, {api_key: SMMO_apiKey})
    .then(res => {
        return new Promise((resolve, reject) => {
            let now = new Date().getTime(); // current time\
            // console.log(res.data)
            let bosses_time = res.data
                .filter(boss => boss.enable_time - (now/1000) <= 3600)
                .map(boss => boss.enable_time);
            //console.log(res.data.filter(boss => boss.enable_time - (now/1000) <= 14400))
            //console.log(bosses_time);
            //let bosses_attack = bosses_time.filter(time => time > 0);
            //console.log(bosses_attack);
            if(bosses_time.length != 0){
                bosses_time = bosses_time.sort();
                resolve(bosses_time);
                // resolve([60, 120]);
            }
            reject("no bossess attackable soon");
        })
    })
    .then(times => {
        const newTimes = times.map(time => {
            let t = time;
            if (t <= 300){
                return t;
            }
            return t - 300;
        })

        for(time of newTimes){
            dcHandler.countDown(
                time * 1000,
                "791497108351615049",
                "793438432646135808",
                "WB in 5 mins");
        }
        // setTimeout(() => {
        //     bot.channels.fetch("791497108351615049")
        //         .then(channel => {
        //             channel.send(`<@&793438432646135808> WB in 5 mins`)
        //             // channel.send(`<@${channel.server.roles.get("tester")}> WB attaackable now`)
        //             // console.log()
        //         })
        //       .catch(err => console.log(err));
        // }, time - 300000)
    })
    // .then(() => {
    //     dcHandler.countDown(
    //         60000,
    //         "791497108351615049",
    //         "793438432646135808",
    //         "WB attackable now");
    //     // setTimeout(() => {
    //     //     bot.channels.fetch("791497108351615049")
    //     //         .then(channel => {
    //     //             channel.send(`<@&793438432646135808> WB attaackable now`)
    //     //             // channel.send(`<@${channel.server.roles.get("tester")}> WB attaackable now`)
    //     //             // console.log()
    //     //         })
    //     //       .catch(err => console.log(err));
    //     // }, 60000)
    // })
    .catch(err => console.log(err));



// setInterval(wbPing(), 3600000);
// wbPing();
