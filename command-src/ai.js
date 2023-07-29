const { SlashCommandBuilder } = require('discord.js')

const commands = new SlashCommandBuilder()
    .setName('openai')
    .setDescription('很多(?)AI的東西')
    .setNameLocalizations({
        'zh-TW': '人工智慧',
    })
    .addSubcommand(subcommand => subcommand.setName('chatgpt')
        .setNameLocalizations({
            'zh-TW': '聊天',
        })
        .setDescription('和ChatGPT聊天')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('您想要問什麼?')
                .setRequired(true))
    )
    .addSubcommand(subcommand => subcommand.setName('image')
        .setNameLocalizations({
            'zh-TW': '圖片',
        })
        .setDescription('圖片產生')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('描述你想看到的東西')
                .setRequired(true))
    )

module.exports = commands