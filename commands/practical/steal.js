const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionsBitField} = require('discord.js');
const { default: axios } = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get')
		.setDescription('獲取一些玩意')
		.setNameLocalizations({
			'zh-TW': '獲取',
		})
        .addSubcommand(subcommand => subcommand.setName('bot')
            .setNameLocalizations({
                'zh-TW': '機器人連結',
            })
            .setDescription('獲取其他機器人的邀請連結')
            .addUserOption(option => option.setName('user')
                .setNameLocalizations({
                    'zh-TW': '人',
                })
                .setDescription('要知道的機器人')
                .setRequired(true)
            )
        )
        .addSubcommandGroup(group => group.setName('emoji')
            .setNameLocalizations({
                'zh-TW': '表情',
            })
            .setDescription('竊取表情:)')    
            .addSubcommand(subcommand => subcommand.setName('add')
                .setNameLocalizations({
                    'zh-TW': '新增',
                })
                .setDescription('新增一個表情至伺服器')    
                .addStringOption(option => option.setName('emoji')
                    .setNameLocalizations({
                        'zh-TW': '新增',
                    })
                    .setDescription('你想新增的表情符號')
                    .setRequired(true))
                .addStringOption(option => option.setName('name')
                    .setNameLocalizations({
                        'zh-TW': '名稱',
                    })
                    .setDescription('表情符號名稱')
                    .setRequired(true))
            )
            .addSubcommand(subcommand => subcommand.setName('send')
                .setNameLocalizations({
                    'zh-TW': '發送',
                })
                .setDescription('發送一個裡面有emoji的訊息')    
                .addStringOption(option => option.setName('emoji')
                    .setNameLocalizations({
                        'zh-TW': '表情',
                    })
                    .setDescription('你想發送的表情')
                    .setRequired(true))
            )
        ),  
	async execute(interaction) {
        const command = interaction.options.getSubcommand()
        if (interaction.options.getSubcommandGroup() === 'emoji') {
            if (!interaction.guild) return await interaction.reply('請在伺服器執行此指令!')
            let emoji = interaction.options.getString('emoji')
            if (emoji.startsWith('<') && emoji.endsWith('>')) {
                const id = emoji.match(/\d{15,}/g)[0]

                const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`).then(img => {
                    if (img) return "gif"
                    else return "png"
                }).catch(e => {
                    return "png"
                })
                
                emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
            }
            if (command === 'send') {
                if (!emoji) return await interaction.reply({content: '呃 不要給我一些我不知道的表情:(', ephemeral: true})

                try {
                    const embedForWebhook = new EmbedBuilder()
                    .setColor(0xfeed7a)
                    .setDescription(`表情符號偵查器(x)`)
                    .setImage(emoji)
                    .setTimestamp()
                    .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })

                    const buttonbuilder = new ButtonBuilder()
                    .setLabel('獲取連結!')
                    .setEmoji('994629876399210567')
                    .setURL(emoji)
                    .setStyle(ButtonStyle.Link)
                    const buttonForWebhook = new ActionRowBuilder().addComponents(buttonbuilder)
                    await interaction.reply({embeds: [embedForWebhook], components: [buttonForWebhook]})
                } catch (e) {
                    console.log(e)
                }
            } else if (command === 'add') {
                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) return await interaction.reply({content: '呃 這個指令需要你有表情符號管理權限 請和伺服器管理員反應! ~~||不要找我||~~'})
                if (!emoji) return await interaction.reply({content: '呃 不要給我原版表情或一些怪怪的東西:(', ephemeral: true})
                const name = interaction.options.getString('name')
                interaction.guild.emojis.create({attachment: `${emoji}`, name: `${name}`}).then(emoji => {
                    const embedForAdd = new EmbedBuilder()
                    .setColor(0x304fd3)
                    .setAuthor({name: `成功新(抄)增(襲)一個表情符號至此伺服器!`})
                    .setTitle(`新增的Emoji: ${emoji} (名稱: \`${name}\`)`)
                    .setTimestamp()
                    .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
                    return interaction.reply({embeds: [embedForAdd]})
                }).catch(e => {
                    interaction.reply({content: '呃 你的伺服器是不是沒有表情符號的欄位了...?', ephemeral: true})
                })
            }
        } else if (command === 'bot'){
            const user = interaction.options.getUser('user')
            const s_embed = new EmbedBuilder()
                .setColor(0xfeed7a)
                .setAuthor({name: `${user.tag} 的邀請連結`})
                .setDescription(`https://discord.com/api/oauth2/authorize?client_id=${user.id}&permissions=8&scope=applications.commands%20bot`)
                .setTimestamp()
                .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
            await interaction.reply({ embeds: [s_embed] , ephemeral: true });
        }
        
	}
};