const { SlashCommandBuilder , EmbedBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('time')
    .setNameLocalizations({
      'zh-TW': '時間獲取',
    })
		.setDescription('現在時間')
	,
	async execute(interaction) {
        var all = new Date();
        var Today = 
        "現在時間: " + all.getFullYear()+ " 年 " + (all.getMonth()+1) + " 月 " + all.getDate() + " 日 " + all.getHours() + ":" + all.getMinutes() + ":" + all.getSeconds() + "." + all.getMilliseconds()
        
        const s_embed = new EmbedBuilder()
          .setColor(0xfeed7a)
          .setTitle('現在時間')
          .setDescription(Today)
          .setTimestamp()
          .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
        await interaction.reply({ embeds: [s_embed] , ephemeral: true });

	},
};