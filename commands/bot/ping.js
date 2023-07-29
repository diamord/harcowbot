const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: require('../../command-src/ping.js'),
	async execute(interaction) {
		const msg = await interaction.reply({
			content: "延遲計算中...",
			fetchReply: true
		  });
		  
		  const ping = msg.createdTimestamp - interaction.createdTimestamp;
			
		  interaction.editReply(`${ping} ms`) 
	},
};