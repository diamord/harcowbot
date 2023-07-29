const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('music-stop')
        .setNameLocalizations({
			'zh-TW': '停止音樂',
		})
		.setDescription('暫時停止播放'),
	async execute(interaction) {
        return
	},
}