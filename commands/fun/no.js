const { SlashCommandBuilder , EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('no')
		.setNameLocalizations({
			'zh-TW': '無',
		})
		.setDescription('?'),
	async execute(interaction) {
    await interaction.reply('** **')
	}
};