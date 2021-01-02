/*****************************************************************
    PROJECT:
        SMMO-BOT
    DESCRIPTION:
        Module for any functions related to the DC side of things

    Developed by Calista Lai
    Dec 2020
    Send me coffee pls
*****************************************************************/
Discord = require("discord.js");

const bot = new Discord.Client();
const DC_TOKEN = process.env.DC_TOKEN;

bot.login(DC_TOKEN);

const countDown = (time, channel, role, m) => {
    setTimeout(() => {
        bot.channels.fetch(channel)
            .then(channel => {
                channel.send(`<@&${role}> ${m}`)
                // channel.send(`<@${channel.server.roles.get("tester")}> WB attaackable now`)
                // console.log()
            })
          .catch(err => console.log(err));
    }, time)
}

module.exports = {
    countDown
}
