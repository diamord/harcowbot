const { SlashCommandBuilder, PermissionsBitField, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
data: new SlashCommandBuilder()
    .setName('announcement')
    .setDescription('公告一則訊息!')
    .setNameLocalizations({'zh-TW': '公告'}),
async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return await interaction.reply({content: '你沒有權限...', ephemeral: true})
    const modal = new ModalBuilder()
			.setCustomId('modal')
			.setTitle('設定公告詳細內容');

		const title = new TextInputBuilder()
			.setCustomId('title')
			.setLabel('標題')
            .setMaxLength(254)
            .setMinLength(5)
            .setRequired(true)
			.setStyle(TextInputStyle.Short)
        
        const pin = new TextInputBuilder()
			.setCustomId('pin')
			.setLabel('是否訂選(不輸入代表不要)')
            .setMaxLength(1)
            .setRequired(false)
			.setStyle(TextInputStyle.Short)

		const description = new TextInputBuilder()
			.setCustomId('description')
            .setMaxLength(1023)
            .setMinLength(1)
            .setRequired(true)
			.setLabel('內容')
			.setStyle(TextInputStyle.Paragraph);

		const a = new ActionRowBuilder().addComponents(title);
		const b = new ActionRowBuilder().addComponents(description);
        const c = new ActionRowBuilder().addComponents(pin);
		modal.addComponents(a,b,c);

		await interaction.showModal(modal)
    }
};