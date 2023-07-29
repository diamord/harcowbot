const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reaction')
        .setNameLocalizations({
            'zh-TW': '反應力遊戲',
        })
		.setDescription('反應力測試'),
	async execute(interaction) {
        function random(min,max){
            return Math.floor(Math.random()*max)+min;
        }

        const no = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('wait')
                    .setLabel('等等...')
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(true),
            );
        const yes = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ok')
                    .setLabel('按下!')
                    .setStyle(ButtonStyle.Success),
            );
        const embed_no = new EmbedBuilder()
          .setColor(0xfeed7a)
          .setAuthor({name: '🎯反應力測試'})
          .setTitle('按鈕一變綠就按下!')
		  .setTimestamp()
          .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
        const embed_yes = new EmbedBuilder()
          .setColor(0xfeed7a)
          .setAuthor({name: '🎯反應力測試'})
          .setTitle('就是現在! 按下那顆綠綠(x)的按鈕')
		  .setTimestamp()
          .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
        
        const msg = await interaction.reply({components: [no], embeds: [embed_no], ephemeral: true})
        const delay = random(3, 8)

        await wait(delay * 1000)

        await msg.edit({components: [yes], embeds: [embed_yes]})

        const filter = i => i.customId === 'ok' && i.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
        
        collector.on('collect', async i => {
            const tms = i.createdTimestamp - interaction.createdTimestamp - delay * 1000
            const embed_use = new EmbedBuilder()
            .setColor('DarkGreen')
            .setAuthor({name: '🎯反應力測試'})
            .setTitle(`測試完畢! 你的反應時間大概是\`${tms}\`ms`)
            .setDescription('(此數據為一些延遲下才那麼高的，可以自己加減1000左右)')
            .setTimestamp()
            .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
            
            await msg.edit({ components: [] , embeds: [embed_use] });
        });
	}
};