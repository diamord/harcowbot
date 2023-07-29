const { SlashCommandBuilder , EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dice')
        .setNameLocalizations({
            'zh-TW': '骰子',
        })
		.setDescription('骰個骰子!'),
	async execute(interaction) {
        const dice_num = Math.floor(Math.random() * (6 - 1)) + 1
        const dice_embed = {
            color: 0xe2a35a,
            author: {
                name: '🎲骰骰子'
            },
            title: `你骰到了 ${dice_num}`,
            timestamp: new Date().toISOString(),
            footer: {
                text: ' ‧ 蝦餃機器人',
                icon_url: 'https://i.imgur.com/BCmppEM.png',
            },
        }

        await interaction.reply({embeds: [dice_embed], ephemeral: true})
	}
};