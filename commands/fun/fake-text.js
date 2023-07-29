const { SlashCommandBuilder , EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('faketext')
        .setNameLocalizations({
            'zh-TW': '廢文產生',
        })
		.setDescription('隨機文章產生器')
        .addNumberOption(option =>
			option.setName('size')
                .setNameLocalizations({
                    'zh-TW': '文字數量',
                })
                .setDescription('文字數量(最多500)')
                .setRequired(true)
                .setMaxValue(500)
                .setMinValue(50)
        )
        .addStringOption(option =>
            option.setName('type')
                .setNameLocalizations({
                    'zh-TW': '文字類型',
                })
                .setDescription('類型')
                .setRequired(true)
                .addChoices(
                    { name: '一句話', value: 'default' },
                    { name: '文言文', value: 'wenyan' },
                    { name: '喵', value: 'miew' },
                    { name: '五言句', value: 'poem5' },
                    { name: '七言句', value: 'poem7' },
                )),
    async execute(interaction) {
        const size = interaction.options.getNumber('size')
        const type = interaction.options.getString('type')
        let say 

        if(type == 'default') say = '一句話'
        else if(type == 'wenyan') say = '文言文'
        else if(type == 'miew') say = '喵文'
        else if(type == 'poem5') say = '五言文'
        else if(type == 'poem7') say = '七言文'

        let text = async(url) => {
            let response = await fetch(url);
            let final = await response.text();
            const embed = {
                color: 0xe2a35a,
                author: {
                    name: '🛐假文產生器'
                },
                title: '\u200b',
                fields: [
                    {
                        name: say,
                        value: final,
                    },
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: ' ‧ 蝦餃機器人 (假文產生網站:https://textgen.cqd.tw/)',
                    icon_url: 'https://i.imgur.com/BCmppEM.png',
                },
            }
            await interaction.reply({embeds: [embed]})
    
        }
        const x = text(`https://textgen.cqd.tw?format=plain&size=${size}&type=${type}`)
	}
};