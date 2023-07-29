const { SlashCommandBuilder } = require('discord.js')

const commands = new SlashCommandBuilder()
    .setName('ping')
    .setNameLocalizations({
        'zh-TW': '延遲',
    })
    .setDescription('查看延遲')

module.exports = commands