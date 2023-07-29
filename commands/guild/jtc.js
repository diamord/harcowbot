const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const path = require('path')
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jointocreate')
        .setDescription('設定一個臨時語音頻道(加入即創建)')
        .setNameLocalizations({
            'zh-TW': '臨時語音頻道',
        })
        .addSubcommand(sub => sub.setName('create').setNameLocalizations({'zh-TW': '創建'}).setDescription('創建一個客服單系統')
            .addChannelOption(option =>
                option.setName('channel')
                    .setDescription('能夠創建臨時語音頻道的頻道(?')
                    .addChannelTypes(ChannelType.GuildVoice)
                    .setRequired(true))
            .addChannelOption(option =>
                option.setName('category')
                    .setDescription('頻道要創建在哪?')
                    .addChannelTypes(ChannelType.GuildCategory)
                    .setRequired(true))
        )
        .addSubcommand(sub => sub.setName('remove').setNameLocalizations({'zh-TW': '移除'}).setDescription('將這個伺服器的語音頻道系統全部移除')),
        async execute(interaction) {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: ':thinking: 你不是管理員?', ephemeral: true})

            const filePath = path.join(__dirname, '../../jsons', 'jtc.json');
            const data = fs.readFileSync(filePath)
            const obj = JSON.parse(data)

            switch (interaction.options.getSubcommand()) {
                case 'create':
                    const index = obj.findIndex(entry => entry.guildId === interaction.guildId)

                    if (index != -1) return await interaction.reply({content: '酷! 你已經創建過了!', ephemeral: true})
        
                    const channel = interaction.options.getChannel('channel')
                    const category = interaction.options.getChannel('category')
                    obj.push({
                        channelId: channel.id,
                        create: category.id,
                        guildId: interaction.guild.id
                    })
                    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2))
                    
                    const embedReply = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`<a:check:1090645242425921667> | 臨時語音頻道創建成功!`)
                    .setDescription('現在可以加入頻道創建語音頻道了!\n(若沒反應可能是我沒有 **移動成員** 的權限)')
                    .addFields({ name: '位置:', value: `${channel}`},{ name: '類別:', value: `${category}`})
                    await interaction.reply({embeds: [embedReply], ephemeral: true})

                    channel.setUserLimit(1).catch(e => { return })

                    break
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
                    .setDescription('現在可以重新創建了!')
                    await interaction.reply({embeds: [embedForRemove], ephemeral: true})
                    
                    break
            }
        }
    };