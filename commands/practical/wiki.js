const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wiki = require('wikijs').default()

module.exports = {
data: new SlashCommandBuilder()
    .setName('wiki')
    .setDescription('在Discord上看維基百科:D')
    .setNameLocalizations({'zh-TW': '維基百科',})
    .addStringOption(option => option.setName('query').setNameLocalizations({'zh-TW': '問題',}).setDescription('你想知道甚麼?').setRequired(true)),
async execute(interaction) {
        const text = interaction.options.getString('query')
        
        await interaction.deferReply()
        
        const search = await wiki.search(text)
        if (!search.results.length) return interaction.editReply({content: '這真尷尬... 你是不是搜尋了一個維基百科沒有的東西?', ephemeral: true})

        const final = await wiki.page(search.results[0])

        const result = await final.summary()

        if (result.length > 4000) {
            return await interaction.editReply({content: `${result.slice(0, 1024)}`, ephemeral: true})
        } else {
            const embed = new EmbedBuilder()
            .setColor(0xfeed7a)
            .setTitle(`${final.raw.title} 的搜尋結果!`)
            .setDescription(`\`\`\`${result.slice(0, 1024)}...\`\`\``)
            .setTimestamp()
            .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
            
            await interaction.editReply({embeds: [embed], ephemeral: true})
        }
    }
};