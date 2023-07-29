const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const axios = require('axios')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('texttoimage')
        .setNameLocalizations({
            'zh-TW': '文字轉圖片',
        })
		.setDescription('把你想要的文字轉成圖片')
        .addStringOption(option => option.setName('text').setDescription('你想要轉的文字').setRequired(true))
        .addStringOption(option => option.setName('bgcolor').setDescription('背景顏色(不填為白色)').addChoices(
            { name: '紅色(#FF0000)', value: 'FF0000' },
            { name: '橘色(#FFA600)', value: 'FFA600' },
            { name: '黃色(#FFFF00)', value: 'FFFF00' },
            { name: '綠色(#00FF00)', value: '00FF00' },
            { name: '青色(#00FFFF)', value: '00FFFF' },
            { name: '藍色(#0000FF)', value: '0000FF' },
            { name: '紫色(#7900D1)', value: '7900D1' },
            { name: '黑色(#000000)', value: '000000' },
            { name: '白色(#FFFFFF)', value: 'FFFFFF' },
            { name: '透明', value: 'no' }
        ))
        .addStringOption(option => option.setName('color').setDescription('文字顏色(不填為黑色)').addChoices(
            { name: '紅色(#FF0000)', value: 'FF0000' },
            { name: '橘色(#FFA600)', value: 'FFA600' },
            { name: '黃色(#FFFF00)', value: 'FFFF00' },
            { name: '綠色(#00FF00)', value: '00FF00' },
            { name: '青色(#00FFFF)', value: '00FFFF' },
            { name: '藍色(#0000FF)', value: '0000FF' },
            { name: '紫色(#7900D1)', value: '7900D1' },
            { name: '黑色(#000000)', value: '000000' },
            { name: '白色(#FFFFFF)', value: 'FFFFFF' },
        ))
        .addNumberOption(option => option.setName('size').setDescription('文字大小(不填為10)').setMinValue(6).setMaxValue(40)),
	async execute(interaction) {
        const text = interaction.options.getString('text')
        const bgcolor = interaction.options.getString('bgcolor') || 'FFFFFF'
        const textcolor = interaction.options.getString('color') || '000000'
        let size = interaction.options.getNumber('size') || 10
        size = size.toString()
        
        axios.get(`https://api.imgbun.com/png?key=010f7b1eb885e3ba6c93fb21a4050a19&text=${text}&color=${textcolor}&size=${size}&background=${bgcolor}`).then(async res => {
            let url = res.data.direct_link

            const embed = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({name: '📝 | 文字轉圖片', url: 'https://imgbun.com'})
            .setTitle(`${text}`)
            .setImage(url)
            .setTimestamp()
            .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' });

            const button = new ActionRowBuilder().addComponents( new ButtonBuilder().setLabel('下載').setURL(`${url}`).setStyle(ButtonStyle.Link).setEmoji('1090649620222320812'))

            await interaction.reply({embeds: [embed], components: [button]})
        })
    }
};