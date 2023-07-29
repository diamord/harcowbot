const { Events } = require('discord.js');
const colors = require('colors/safe');
const nowTime = require('../run/time.js')

module.exports = {
	name: Events.GuildDelete,
	async execute(guild) {
		console.log(colors.blue('[LOG]') + ` [${nowTime()}] 機器人已從: ${guild.name} 被退出!`)
	},
};