const { SlashCommandBuilder , EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createinvite')
		.setDescription('創建伺服器邀請')
        .setNameLocalizations({
            'zh-TW': '創建邀請連結',
        }),
	async execute(interaction) {
        await interaction.channel.createInvite().then(invite => {
            
            const embed = new EmbedBuilder()
                .setColor(0x4e59df)
                .setTitle(`${interaction.guild.name} 的邀請連結`)
                .setDescription(`https://discord.gg/${invite.code}`)
            interaction.reply({embeds: [embed]});
          });
	}
};