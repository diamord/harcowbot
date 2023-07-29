const { SlashCommandBuilder , EmbedBuilder } = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
	.setName('gay')
        .setNameLocalizations({
		'zh-TW': '同性戀',
	})
	.setDescription('你的同型戀指數:0')
        .addUserOption(option => option.setName('who')
                        .setDescription('要看誰?')
                        .setDescriptionLocalizations({
                                "zh-TW": '使用者'
                        })
                        .setRequired(true)
        ),
	async execute(interaction) {
                let user = interaction.options.getUser('who')
                let gay = Math.floor(Math.random() * 100)

                const embed = new EmbedBuilder()
                .setAuthor({name: `${user.tag} 的Gay機率居然是???`})
                .setColor(0xfeea3d)
                .setTitle(`\`${gay}\` %!!!`)
                .setDescription('這真的令人驚呆...')
                .setTimestamp()
                .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
                await interaction.reply({embeds: [embed]});

	},
};