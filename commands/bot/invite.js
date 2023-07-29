const { SlashCommandBuilder , ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: require('../../command-src/invite.js'),
	async execute(interaction) {
        const inv = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('邀請我')
					.setStyle(ButtonStyle.Link)
            .setEmoji('591783543663886352')
            .setURL('https://bit.ly/harcow')
        );
    const link_embed = {
        color: 0xce42c0,
        author: {
            name: '🔊邀請機器人'
        },
        title: '按按鈕邀請機器人',
        }
        await interaction.reply({embeds: [link_embed],ephemeral: true, components: [inv]})
    }
};