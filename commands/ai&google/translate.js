const { SlashCommandBuilder , EmbedBuilder } = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = {
	data: require('../../command-src/translate.js'),
	async execute(interaction) {
        let text = interaction.options.getString('text')
        let language = interaction.options.getString('language')
        let show

        if (language === 'en') {
            show = '英文'
        } else if (language === 'ja') {
            show = '日本語'
        } else if (language === 'ko') {
            show = '韓文'
        } else if (language === 'zh-tw') {
            show = '繁體中文'
        } else if (language === 'zh-cn') {
            show = '簡體中文'
        }
        translate(text, { to: language }).then(res => {
            const embed = new EmbedBuilder()
                .setColor(0x4e59df)
                .setAuthor({name: `${text} 翻譯成 ${show}`})
                .setDescription(String(res.text))
                .setTimestamp()
                .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
            interaction.reply({ embeds: [embed] });
          }).catch(err => {
            console.error(err);
          });

	},
};