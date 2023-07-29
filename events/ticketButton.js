const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ChannelType, PermissionsBitField } = require('discord.js');

const { createTranscript } = require('discord-html-transcripts');

const fs = require('fs');
const path = require('path')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isButton() || interaction.customId != 'ct') return
        
        const filePath = path.join(__dirname, '../jsons', 'ticket.json')
		const data = fs.readFileSync(filePath)
		const obj = JSON.parse(data);
		const index = obj.find(entry => entry.guildId === interaction.guildId)
		
        if (index === -1) return

        const channelName = (interaction.user.id).substr(14)

        const embed = new EmbedBuilder().setTitle(`❌ | 你已經創建了一個客服頻道! (\`客服單-${channelName}\`)`).setDescription('先到頻道吧!').setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })

        const posChannel = await interaction.guild.channels.cache.find(ch => ch.name === `客服單-${channelName}`)
        if (posChannel) return await interaction.reply({embeds: [embed], ephemeral: true})

        const where = index.channelId

        const ticketEmbed = new EmbedBuilder().setColor('DarkGreen').setTitle(`${interaction.user.username} 的客服頻道`).setDescription('請等待管理員或客服!\n若關閉按鈕失效請聯絡管理員!!!').setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })

        const button = new ActionRowBuilder()
        .addComponents( 
            new ButtonBuilder().setLabel('關閉').setCustomId('off').setStyle(ButtonStyle.Danger).setEmoji('1090309083254497380')
        )

        let channel = await interaction.guild.channels.create({
            name: `客服單-${channelName}`,
            type: ChannelType.GuildText,
            parent: `${where}`,
            permissionOverwrites: [
                {
                  id: interaction.guildId, 
                  deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                  id: interaction.user.id,
                  allow: [PermissionsBitField.Flags.ViewChannel], 
                },
            ],
        })

        let message = await channel.send({ embeds: [ticketEmbed], components: [button], content: `` })
        await interaction.reply({content: '已開啟一張客服單!', ephemeral: true})

        const c = message.createMessageComponentCollector()

        c.on('collect', async i => {
            const file = await createTranscript(i.channel, {
                limit: 500,
                returnBuffer: false,
                filename: `${interaction.channel.name.toLowerCase()}-ticket.html`
            })

            let cache = interaction.client.channels.cache.get('1114367299114258445')

            let msgFile = await cache.send({files: [file]})
            if (index.logId === 'no') {
                await channel.delete() 
            } else {
                const embedEnd = new EmbedBuilder().setColor('Random').setAuthor({name: `訊息備份`}).setDescription(`關閉時間: <t:${Math.floor(i.createdTimestamp / 1000)}:f>\n關閉人員: ${i.user.tag}\n連結: https://mahto.id/chat-exporter?url=${msgFile.attachments.first()?.url}`).setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' }).setTimestamp()
                await interaction.client.channels.cache.get(index.logId).send({embeds: [embedEnd]}).catch((e) => { return })
                await channel.delete() 
            }

            const embedDm = new EmbedBuilder().setColor('Random').setTitle('你的客服單已關閉!').setDescription('謝謝您等待這們久時間www\n訊息備份連結:' + `https://mahto.id/chat-exporter?url=${msgFile.attachments.first()?.url}`).setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' }).setTimestamp()

            await interaction.member.send({ embeds: [embedDm] }).catch(e => {return})
        })
	},
};