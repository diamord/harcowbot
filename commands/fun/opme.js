const { SlashCommandBuilder , ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('opme')
        .setNameLocalizations({
            'zh-TW': '獲取管理',
        })
		.setDescription('讓自己變OP:D'),
	async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('驗證')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://bit.ly/3E6XzES')
            
        );
        await interaction.reply({ content: '就差一步就可以拿到管理員了！請點選下方按鈕來證明你不是機器人：', components: [row], ephemeral: true });

	},
};