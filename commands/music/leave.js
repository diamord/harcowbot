const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('music-leave')
        .setNameLocalizations({
			'zh-TW': '離開',
		})
		.setDescription('將音樂機器人趕走(?'),
	async execute(interaction) {
        return
	},
}