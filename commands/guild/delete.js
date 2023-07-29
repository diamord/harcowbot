const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete')
        .setDescription('刪除指令數量的訊息')
        .setNameLocalizations({
            'zh-TW': '刪除訊息',
        })
        .addNumberOption(option => option.setName('count').setDescription('刪除訊息數量').setMinValue(1).setRequired(true)).addUserOption(option => option.setName('user').setDescription('刪除特定使用者的訊息')),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return await interaction.reply({ content: '你似乎沒有**管理訊息**的權限? 檢查一下?', ephemeral: true })

        await interaction.deferReply({ ephemeral: true })
        
        const embed = new EmbedBuilder().setColor('Random')

        embed.setTitle('<a:loading:1101100808231194664> | 開始刪除訊息!').setDescription('如果沒有刪除可能是時間超過了15天或者我沒有權限...')
        await interaction.editReply({ embeds: [embed] })
        
        const user = interaction.options.getUser('user')
        const count = interaction.options.getNumber('count')

        if (count > 100) return await interaction.editReply({ content: '錯誤! 單對象的刪除最大只能刪除 `100` 則訊息(這個指令還沒做得太好...)', embeds: [], ephemeral: true })

        try {
            const msgs = await interaction.channel.messages.fetch({ limit: count + 1 })

            if (user) {
                let i = 0
                let filtered = []

                (await msgs).filter(msg => {
                    if (msg.author.id === user.id && count > i) {
                        filtered.push(msg)
                        i++
                    }
                })

                await interaction.channel.bulkDelete(filtered).then(async msg => {
                    embed.setTitle('<:pickaxe:1090309022831358012> | 成功刪除!').setDescription(`已成功在 ${interaction.channel} 刪除 ${user} 的 \`${msg.size}\` 則訊息!`).setTimestamp().setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
                    await interaction.editReply({ embeds: [embed] })
                })
            } else {
                await interaction.channel.bulkDelete(count).then(async msg => {
                    embed.setTitle('<:pickaxe:1090309022831358012> | 成功刪除!').setDescription(`已成功在 ${interaction.channel} 刪除 \`${msg.size}\` 則訊息!`).setTimestamp().setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
                    await interaction.editReply({ embeds: [embed] })
                })
            }
        } catch (err) {
            if (err.message === 'You can only bulk delete messages that are under 14 days old.') {
                embed.setTitle('<:pickaxe:1090309022831358012> | 刪除已結束').setDescription('訊息已超過`14`天')  
                await interaction.editReply({ embeds: [embed] })
            } else {
                console.log(err)
            }
        }
    }
}