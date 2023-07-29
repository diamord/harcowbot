const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('av')
        .setNameLocalizations({
            'zh-TW': '頭貼',
        })
		.setDescription('取得某人的頭貼')
        .addUserOption(option =>
			option.setName('user')
				.setDescription('要查看的人')
				.setRequired(false)
                .setNameLocalizations({
                    'zh-TW': '用戶',
                }))
,
	async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user
        const member = await interaction.guild.members.cache.get(user.id)

        const guildAvatar = member.avatarURL({ size: 512 })
        const userAvatar = user.avatarURL({ size: 512 })

        let row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setURL(`${userAvatar}`)
                .setLabel('下載圖片')
                .setEmoji('1090309043500875816')
                .setStyle(ButtonStyle.Link),
            )
            .addComponents(
                new ButtonBuilder()
                .setCustomId('aav')
                .setLabel('個人頭像')
                .setEmoji('1090309043500875816')
                .setStyle(ButtonStyle.Success),
            )
        
        if (guildAvatar != null) row.addComponents( new ButtonBuilder().setCustomId('mav').setLabel('公會頭像').setEmoji('1090309043500875816').setStyle(ButtonStyle.Success))
        else row.addComponents( new ButtonBuilder().setCustomId('mav').setLabel('公會頭像').setEmoji('1090309043500875816').setStyle(ButtonStyle.Success).setDisabled(true))
        
        let embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle(`<a:slashcommand:1103689912424857662> **| 使用者: \`${user.username}\` 的頭貼**`)
        .setImage(`${userAvatar}`)
        .setTimestamp()
        .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' });
        const msg = await interaction.reply({embeds: [embed], components: [row]})

        const f = i => i.customId === 'mav' || i.customId === 'aav'
        const collector = interaction.channel.createMessageComponentCollector({f , time: 60000 });
        collector.on('collect', async collector => {
            if (collector.customId === 'mav') {
                embed.setImage(guildAvatar)
                await msg.edit({embeds: [embed], components: [row]})
            } else if (collector.customId === 'aav') {
                embed.setImage(userAvatar)
                await msg.edit({embeds: [embed], components: [row]})
            }
        })

	}
};