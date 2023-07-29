const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('music-play')
        .setNameLocalizations({
			'zh-TW': '播放音樂',
		})
		.setDescription('播放一首歌(現在指令就那麼簡陋，之後會繼續弄)')
		.addStringOption(option => option.setName('keyword').setDescription('搜尋的關鍵字或連結?').setRequired(true)),
	async execute(interaction) {
        return
	},
}