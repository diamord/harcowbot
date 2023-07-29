const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setNameLocalizations({
            'zh-TW': '八號球',
        })
        .setDescription('問8ball問題!')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('你要問啥')
                .setRequired(true))
                .setDescriptionLocalizations({
                    "zh-TW": '問題'
                }),
    async execute(interaction) {
        const responses = [
             '確實如此',
             '毫無疑問。',
             '當然是。',
             "你可以依靠它。",
             "在我看來是的。",
             '最有可能的。',
             '前景良好。',
             '是的。',
             "看起來是的。",
             "再試一次。",
             "稍後再問。",
             '不告訴你。',
             '現在無法預測。',
             "集中精力再問。",
             "別指望它了。",
             "前景不太好。",
        ];
        const question = interaction.options.getString('question');

        const response = responses[Math.floor(Math.random() * responses.length)];

        const embed = {
            color: 0xe2a35a,
            author: {
                name: '🎱8Ball'
            },
            title: question,
            description: `8號球說: ${response}`,
            timestamp: new Date().toISOString(),
            footer: {
                text: ' ‧ 蝦餃機器人',
                icon_url: 'https://i.imgur.com/BCmppEM.png',
            },
        }
        await interaction.reply({embeds: [embed]})
    }
};

