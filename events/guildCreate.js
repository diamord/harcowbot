const { Events } = require('discord.js');
const colors = require('colors/safe');
const nowTime = require('../run/time.js')

module.exports = {
	name: Events.GuildCreate,
	async execute(guild) {
		console.log(colors.blue('[LOG]') + ` [${nowTime()}] 機器人已被邀請至: ${guild.name}!`)
	},
};