const { SlashCommandBuilder , EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('color')
    .setNameLocalizations({
      'zh-TW': '顏色',
    })
		.setDescription('隨機顏色'),
	async execute(interaction) {
    const color = Math.floor(Math.random() * 16777214) + 1
    const c_embed = {
      color: color,
      author: {
        name: '🔵隨機顏色'
      },
      title: color,
      timestamp: new Date().toISOString(),
            footer: {
                text: ' ‧ 蝦餃機器人',
                icon_url: 'https://i.imgur.com/BCmppEM.png',
            },
    }


    await interaction.reply({embeds: [c_embed], ephemeral: true})

	}
};