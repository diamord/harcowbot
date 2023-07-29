const { SlashCommandBuilder } = require('discord.js')

const commands = new SlashCommandBuilder()
    .setName('translate')
    .setNameLocalizations({
        'zh-TW': '翻譯',
    })
    .setDescription('幫你用Google來翻譯')
    .addStringOption(option =>
        option.setName('text')
            .setNameLocalizations({
                'zh-TW': '文字',
            })	
            .setDescription('要翻譯的文字')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('language')
            .setNameLocalizations({
                'zh-TW': '語言',
            })	
            .setDescription('要翻譯的語言(找不到你想要的語言?請使用/suggest來反應!)')
            .setRequired(true)
            .addChoices(
                { name: '英文(English)', value: 'en' },
                { name: '日文(Japanese)', value: 'ja' },
                { name: '韓文(Korean)', value: 'ko' },
                { name: '中文繁體(Chinese Tradionnal)', value: 'zh-tw' },
                { name: '中文簡體(Chinese Simplified)', value: 'zh-cn' },
            ))

module.exports = commands