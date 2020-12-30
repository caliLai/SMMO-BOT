/*****************************************************************
    PROJECT:
        SMMO-BOT
    DESCRIPTION:
        Module for any functions related to the SMMO side of things

    Developed by Calista Lai
    Dec 2020
    Send me coffee pls
*****************************************************************/
Discord = require("discord.js");

const bot = new Discord.Client();
const DC_TOKEN = process.env.DC_TOKEN;

const countDown = (time, channel, role) => {
    setTimeout(() => {
        bot.channels.fetch(`${channel}`)
            .then(channel => {
                channel.send(`<@&${role}> WB attaackable now`)
                // channel.send(`<@${channel.server.roles.get("tester")}> WB attaackable now`)
                // console.log()
            })
          .catch(err => console.log(err));
    }, 3000)
}

module.exports = {
    countDown
}
