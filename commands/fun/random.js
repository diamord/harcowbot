const { SlashCommandBuilder , EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setNameLocalizations({
			'zh-TW': '隨機數',
		})
		.setDescription('給你隨機數')
		.addNumberOption(option =>
			option.setName('small')
				.setNameLocalizations({
					'zh-TW': '小數',
				})
				.setDescription('最小數')
				.setRequired(true))
		.addNumberOption(option =>
			option.setName('big')
				.setNameLocalizations({
					'zh-TW': '大數',
				})
				.setDescription('最大數')
				.setRequired(true))	
	,
	async execute(interaction) {
		const small = interaction.options.getNumber('small')
		const big = interaction.options.getNumber('big')
	
		function getRandom(min, max){
		  return(Math.floor(Math.random()*max)+min)
		};
		const x = getRandom(small, big)
		const s_embed = new EmbedBuilder()
          .setColor(0xfeed7a)
          .setAuthor({name: '🔢隨機數'})
          .setTitle(String(x))
		  .setTimestamp()
          .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
        await interaction.reply({ embeds: [s_embed] , ephemeral: true });
	},
};