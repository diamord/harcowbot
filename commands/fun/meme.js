const { SlashCommandBuilder , EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
        .setNameLocalizations({
            'zh-TW': '迷因',
        })
		.setDescription('給你看一個隨機迷因(reddit)'),
	async execute(interaction) {
        await interaction.deferReply()
        const le = new EmbedBuilder()
            .setColor(0x661081)
            .setTitle('正在獲取資料...');

        await interaction.editReply({embeds: [le]})
        
        await fetch('https://reddit.com/r/memes/random/.json').then(async res => {
            const meme = await res.json()

            const title = meme[0].data.children[0].data.title
            const img = meme[0].data.children[0].data.url
            const author = meme[0].data.children[0].data.author

            const embed = new EmbedBuilder()
                .setColor('Random')
                .setTitle(`${title}`)
                .setDescription(`Reddit作者: **${author}**`)
                .setImage(`${img}`)
                .setURL(`${img}`)
                .setTimestamp()
                .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' });

            await interaction.editReply({embeds: [embed]})
        })
	}
};