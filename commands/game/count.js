const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const path = require('path')
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('count')
        .setDescription('數數字遊戲! 可以一起玩!')
        .setNameLocalizations({
            'zh-TW': '數數字遊戲',
        })
        .addSubcommand(sub => sub.setName('create').setNameLocalizations({'zh-TW': '創建'}).setDescription('創建數數系統頻道')
            .addChannelOption(option =>
                option.setName('channel')
                    .setDescription('要設定在哪?')
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true))
        )
        .addSubcommand(sub => sub.setName('remove').setNameLocalizations({'zh-TW': '移除'}).setDescription('將這個伺服器的數數訊息系統移除')),
        async execute(interaction) {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: ':thinking: 你不是管理員?', ephemeral: true})

            const filePath = path.join(__dirname, '../../jsons', 'count.json')
            const data = fs.readFileSync(filePath)
            const obj = JSON.parse(data)

            switch (interaction.options.getSubcommand()) {
                case 'create':
                    const index = obj.findIndex(entry => entry.guildId === interaction.guildId)

                    if (index != -1) return await interaction.reply({content: '酷! 你已經創建過了!', ephemeral: true})
        
                    const channel = interaction.options.getChannel('channel')

                    obj.push({
                        channelId: channel.id,
                        guildId: interaction.guild.id,
                        nowNumber: 1,
                        player: 'no'
                    })
                    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2))
                    
                    const embedReply = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`<a:check:1090645242425921667> | 成功創建數數系統!`)
                    .setDescription('可輸入數字!\n規則: \n```1.不可同一個人連續使用\n2.不可跳過或重複一個數字```')
                    .addFields({ name: '創建頻道', value: `<#${channel.id}>`, })
                    .setTimestamp()
                    .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })

                    await interaction.reply({embeds: [embedReply], ephemeral: true})

                    break
                case 'remove':
                    const filteredArray = obj.filter(obj => obj.guildId !== interaction.guildId);

                    if (filteredArray === -1) return await interaction.reply({ content: '? 找不到... 使用 `/count create` 來創建吧', ephemeral: true })

                    const updatedJson = JSON.stringify(filteredArray);

                    fs.writeFileSync(filePath, updatedJson, 'utf-8');

                    const embedForRemove = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`<a:check:1090645242425921667> | 成功移除!`)
                    .setDescription('現在可以重新創建了!')
                    await interaction.reply({embeds: [embedForRemove], ephemeral: true})
                    
                    break
            }
        }
    };