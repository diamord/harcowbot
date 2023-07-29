const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const ezEB = require('../../run/helpsrc.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setNameLocalizations({
			'zh-TW': '幫助',
		})
		.setDescription('取得機器人的使用方法'),
	async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({name: '蝦餃機器人簡介'})
			.setTitle('使用選單來查看指令!')
            .setDescription('```這是一個娛樂/實用的中文機器人\n開發者是一個國一癈癈:村長，他是一個新手開發者\n所以如果你有任何問題都可以私訊我來提供意見!\n這裡有一些實用的指令: /nickchat 匿名聊天, /ai ChatGPT之類的```')
			.setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' }).setTimestamp()
        await interaction.reply({embeds: [embed], ephemeral: true, components: [ezEB(5), ezEB(6)]})
    }
};