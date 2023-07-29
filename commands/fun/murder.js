const { SlashCommandBuilder , EmbedBuilder, userMention } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kill')
        .setNameLocalizations({
            'zh-TW': '殺人',
        })
		.setDescription('拿起手邊的東西殺人owo')
        .addUserOption(option =>
			option.setName('user')
                .setNameLocalizations({
                    'zh-TW': '被害者',
                })
                .setDescription('你要殺誰?')
                .setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user')
        
        if (user === interaction.user) return await interaction.reply(':thinking: 你殺自己做什麼?')

        const weaponRandom = Math.floor(Math.random() * 5)
        const event = Math.floor(Math.random() * 3)

        const weapon = ['刀子', '花瓶', '磚頭', '水管', '水果刀', '武士刀']
        const embed = new EmbedBuilder().setColor(0xcd7b56).setTimestamp().setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })

        await interaction.reply(`**你拿起 ${weapon[weaponRandom]} 砸向 ${userMention(user.id)} !**`)

        await wait(3000)

        if (event === 0) {
            embed.setTitle(`**${user.username}** 一個沒注意 你刀了他!`).setDescription('好玩嗎?')
        } else if (event === 1){
            embed.setTitle(`**${user.username}** 轉了個頭 你還是把他刀了...`).setDescription('結果鄰居發現就報警了:)')
        } else if (event === 2){
            embed.setTitle(`**${user.username}** 轉了個頭 他報警 你失敗了!`).setDescription('笑死 殺人未遂')
        } else if (event === 3){
            embed.setTitle(`你發現 **${user.username}** 身體很硬(?) 他沒受傷 你送警局`).setDescription('請不要殺有練功夫的人(bushi)')
        }

        await interaction.followUp({embeds: [embed]})
    }
};