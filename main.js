/***
    SMMO-BOT is a Discord bot made to ping players 5 minutes before a world
    boss is attackable. The world boss is applicable to the game "SimpleMMO".

    Developed by Calista Lai
    Dec 2020
    I have no damn clue what I'm doing
***/

require("dotenv").config();
//----- MODULES-----//
const axios = require("axios"),
Discord = require("discord.js"),
smmo = require("./SMMO_handler.js");

//------API STUFF-----//
const SMMO_apiKey = "vMoVvw5YfyariOUfmRSk2mhczkfHY9ZbWsFucSB2muSQ2GWlTtRdOeGDiwxhvf7k6o4Of9O0vRTi7aww",
    SMMO_wbURL = "https://api.simple-mmo.com/v1/worldboss/all";

//-----IDK MAN-----//
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

//-----OH BOY, FUN STUFF STARTS HERE-----//
bot.login(TOKEN);

// make a HTTP POST request to SMMO
let fuck = axios.post(SMMO_wbURL, {api_key: SMMO_apiKey})
    .then(res => {
        return new Promise((resolve, reject) => {
            let now = new Date().getTime(); // current time
            for(boss of res.data){
                // note that enable_time is in seconds and now is in miliseconds
                if(boss.enable_time - (now/1000) > 7200){
                    resolve(boss.name);
                }
            }
            reject("no bossess attackable soon");
        })

        // console.log(res.data);
        //smmo.attackInFive(res);
    })
    .then(b => {
        // okay, I honestly don't know how to not put a promise inside
        // another promise. But hey, it's working.
        bot.channels.fetch("791497108351615049")
          .then(channel => channel.send(
              `${b} will be attackable soon`
          ))
          .catch(err => console.log(err));
    })
    .catch(err => console.log(err));


setInterval(fuck, 3600000);
