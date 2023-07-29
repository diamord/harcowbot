const { Events, EmbedBuilder } = require('discord.js');

const fs = require('fs');
const path = require('path');

module.exports = {
    name: Events.MessageCreate,
    async execute (message) {
        if (!message.guild) return
        if (message.author.bot) return

        const filePath = path.join(__dirname, '../jsons', 'count.json')
        const fileData = JSON.parse(fs.readFileSync(filePath))

        const index = fileData.findIndex(entry => entry.guildId === message.guild.id)
        if (index === -1) return

        const number = Number(message.content)

        if (isNaN(number)) {
            return await message.react('🤔')
        }

        let embed = new EmbedBuilder().setTimestamp().setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })

        if (number != fileData[index].nowNumber) {
            embed.setColor('Red').setTitle('❌ | 糟糕... 有人數錯了').setDescription(`正確數字為: \`${fileData[index].nowNumber}\`, 歸零重來! GG!`)

            fileData[index].nowNumber = 1
            fileData[index].player = 'no'

            await message.react('❌')
            await message.reply({ embeds: [embed] })

            fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
        } else if (message.author.id === fileData[index].player) {
            embed.setColor('Red').setTitle('❌ | 糟糕... 有人打了兩次...').setDescription(`${message.author.id} 打了兩次! 歸零重來! GG!`)

            fileData[index].nowNumber = 1
            fileData[index].player = 'no'

            await message.react('❌')
            await message.reply({ embeds: [embed] })

            fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2))
        } else {
            await message.react('✅')

            fileData[index].nowNumber += 1
            fileData[index].player = message.author.id
            fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2))
        }
    }
}