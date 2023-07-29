const { SlashCommandBuilder , EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hi')
    .setNameLocalizations({
      'zh-TW': '打招呼',
    })
		.setDescription('say hi'),
	async execute(interaction) {
    const hi_embed = {
      color: 0x834d33,
      author: {
        name: '打招呼'
      },
      title: `${interaction.user.tag} 在和大家說Hi!`,
      timestamp: new Date().toISOString(),
      footer: {
        text: ' ‧ 蝦餃機器人',
        icon_url: 'https://i.imgur.com/BCmppEM.png',
      },
    }
    await interaction.reply({embeds: [hi_embed]});

	}
};