const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const path = require('path')
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('客服單系統')
        .setNameLocalizations({
            'zh-TW': '客服單',
        })
        .addSubcommand(sub => sub.setName('create').setNameLocalizations({'zh-TW': '創建'}).setDescription('創建一個客服單系統')
            .addChannelOption(option =>
                option.setName('channel')
                    .setDescription('發送客服單的頻道')
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true))
            .addChannelOption(option =>
                option.setName('createticket')
                    .setDescription('客服單要創建在哪?')
                    .addChannelTypes(ChannelType.GuildCategory)
                    .setRequired(true))
            .addChannelOption(option =>
                option.setName('log')
                    .setDescription('當客服單關閉後訊息會備份到?')
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(false))
            .addStringOption(option =>
                option.setName('description')
                    .setDescription('客服單的說明')
                    .setRequired(false))
        )
        .addSubcommand(sub => sub.setName('remove').setNameLocalizations({'zh-TW': '移除'}).setDescription('將這個伺服器的客服單系統移除')),
        async execute(interaction) {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: ':thinking: 你不是管理員?', ephemeral: true})

            const filePath = path.join(__dirname, '../../jsons', 'ticket.json');
            const data = fs.readFileSync(filePath)
            const obj = JSON.parse(data)

            switch (interaction.options.getSubcommand()) {
                case 'create':
                    const index = obj.findIndex(entry => entry.guildId === interaction.guildId)

                    if (index != -1) return await interaction.reply({content: '酷! 你已經創建過了!', ephemeral: true})
        
                    const channel = interaction.options.getChannel('channel')
                    const createTicket = interaction.options.getChannel('createticket')
                    const text = interaction.options.getString('description') || '客服單系統'
                    let log = interaction.options.getChannel('log')
                    if (log) log = log.id
                    else log = 'no'
        
                    obj.push({
                        channelId: createTicket.id,
                        guildId: interaction.guildId,
                        logId: log
                    });
                    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2))
        
                    const button = new ActionRowBuilder().addComponents( new ButtonBuilder().setLabel('創建').setCustomId('ct').setStyle(ButtonStyle.Success).setEmoji('1090649620222320812'))
        
                    const embedForReply = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`<a:check:1090645242425921667> | 客服單創建成功!`)
                    .setDescription('有時機器人會被開發者關閉，ticket無法關閉，可自行刪除頻道')
        
                    const embed = new EmbedBuilder()
                    .setColor("Aqua")
                    .setAuthor({name: `${interaction.guild.name} 的客服單`, iconURL: interaction.guild.iconURL()})
                    .setTitle(`<a:check:1090645242425921667> | ${text}`)
                    .setDescription('請點擊按鈕以創建客服單')
                    .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
        
                    await interaction.reply({embeds: [embedForReply], ephemeral: true})
                    await channel.send({embeds: [embed], components: [button]}).then(msg => msg.pin()).catch((err) => {
                        return interaction.reply({content: '呃 我沒權限 無法創建...'})
                    })
                    return
                case 'remove':
                    const objectToRemove = {
                        channelId: interaction.channelId,
                        guildId: interaction.guildId
                    }
                    const filteredArray = obj.filter(obj => obj.guildId !== objectToRemove.guildId);

                    if (filteredArray === -1) return await interaction.reply({content: '? 找不到...', ephemeral: true})

                    const updatedJson = JSON.stringify(filteredArray);

                    fs.writeFileSync(filePath, updatedJson, 'utf-8');

                    const embedForRemove = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`<a:check:1090645242425921667> | 成功移除!`)
                    .setDescription('現在可以刪掉訊息了!')
                    await interaction.reply({embeds: [embedForRemove], ephemeral: true})
                    return
            }
        }
    };