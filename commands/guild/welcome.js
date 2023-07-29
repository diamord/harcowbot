const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const path = require('path')
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('welcome')
        .setDescription('設定一個歡迎訊息的系統')
        .setNameLocalizations({
            'zh-TW': '歡迎訊息',
        })
        .addSubcommand(sub => sub.setName('create').setNameLocalizations({'zh-TW': '創建'}).setDescription('創建歡迎訊息系統')
            .addChannelOption(option =>
                option.setName('channel')
                    .setDescription('我會發送在哪?')
                    .addChannelTypes(ChannelType.GuildText)
                    .setRequired(true))
            .addStringOption(option =>
                option.setName('title')
                    .setDescription('加入後發送Embed的標題?')
                    .setRequired(true))
            .addStringOption(option =>
                option.setName('description')
                    .setDescription('加入後Embed的內容? (參數: {username} 使用者名稱, {guilduser} 伺服器內的使用者數量, {user} 提及使用者, {line} 換行)')
                    .setRequired(true)) 
            .addRoleOption(option => option.setName('role').setDescription('給予身分組? (請設定比我身分組"低"的身分)'))
        )
        .addSubcommand(sub => sub.setName('remove').setNameLocalizations({'zh-TW': '移除'}).setDescription('將這個伺服器的歡迎訊息系統移除')),
        async execute(interaction) {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: ':thinking: 你不是管理員?', ephemeral: true})

            const filePath = path.join(__dirname, '../../jsons', 'ws.json');
            const data = fs.readFileSync(filePath)
            const obj = JSON.parse(data)

            switch (interaction.options.getSubcommand()) {
                case 'create':
                    const index = obj.findIndex(entry => entry.guildId === interaction.guildId)

                    if (index != -1) return await interaction.reply({content: '酷! 你已經創建過了!', ephemeral: true})
        
                    const channel = interaction.options.getChannel('channel')
                    const title = interaction.options.getString('title')
                    const description = interaction.options.getString('description')
                    let role = interaction.options.getRole('role')

                    if (role) role = role.id

                    obj.push({
                        channelId: channel.id,
                        title: title,
                        description: description,
                        role: role,
                        guildId: interaction.guild.id,
                    })
                    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2))
                    
                    const embedReply = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`<a:check:1090645242425921667> | 成功創建歡迎訊息系統!`)
                    .setDescription('如果有成員就會發送了!\n`(如果沒有給身分或發送訊息可能是我沒有權限)`')
                    .setTimestamp()
                    .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })

                    await interaction.reply({embeds: [embedReply], ephemeral: true})

                    break
                case 'remove':
                    const filteredArray = obj.filter(obj => obj.guildId !== interaction.guildId);

                    if (filteredArray === -1) return await interaction.reply({content: '? 找不到...', ephemeral: true})

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