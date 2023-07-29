const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('music-resume')
        .setNameLocalizations({
			'zh-TW': '開始播放',
		})
		.setDescription('重新開始播放'),
	async execute(interaction) {
        return
	},
}