const { SlashCommandBuilder } = require('discord.js')

const commands = new SlashCommandBuilder()
    .setName('invite')
    .setNameLocalizations({
        'zh-TW': '邀請我',
    })
    .setDescription('邀請機器人')

module.exports = commands