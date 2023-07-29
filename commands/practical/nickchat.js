const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs')
const crypto = require("crypto")
const path = require('path')
const colors = require('colors/safe');

function getCode() {
	const codeLength = 8
	const characters = '0123456789abcdefghijklmnopqrstuvwxyz'
  
	let code = '';
	for (let i = 0; i < codeLength; i++) {
	  const randomIndex = crypto.randomInt(0, characters.length);
	  code += characters.charAt(randomIndex);
	}
  
	return code;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nickchat')
    .setNameLocalizations({
        'zh-TW': '匿名聊天',
    })
    .setDescription('讓你的伺服器有匿名聊天!')
    .addSubcommand(subcommand =>
      subcommand
        .setName('create')
        .setNameLocalizations({
            'zh-TW': '創建',
        })
        .setDescription('創建一個匿名聊天頻道')
        .addChannelOption(option =>
          option
            .setName('channel')
            .setDescription('新增匿名聊天的頻道')
            .setRequired(true)
        )
        .addChannelOption(option =>
          option
            .setName('log')
            .setDescription('紀錄訊息所在頻道')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('send')
        .setNameLocalizations({
            'zh-TW': '發送',
        })
        .setDescription('發送一則匿名聊天的訊息')
        .addStringOption(option =>
          option
            .setName('message')
            .setDescription('一則文字')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('reply')
            .setDescription('回復一則其他的匿名聊天訊息(請使用如:1114886717896392764的Id)')
            .setRequired(false)
        )
        .addAttachmentOption(option =>
          option
            .setName('image')
            .setDescription('可以附加一張圖片')
            .setRequired(false)
        )
    ),
  async execute(interaction) {

    const filePath = path.join(__dirname, '../../jsons', 'nc.json');
    const data = fs.readFileSync(filePath);
    switch (interaction.options.getSubcommand()) {
      case 'create':
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages) && !interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({content: '你沒有權限:)', ephemeral: true})
        let userlog = []
        userlog = JSON.parse(data)

        const serverId = interaction.guild.id
        const ch = interaction.options.getChannel('channel')
        const logch = interaction.options.getChannel('log')
        const channelId = ch.id

        if (ch.type != '0') {
          return interaction.reply({ content: '呃 你確定你的頻道是對的?', ephemeral: true });
        }
          
        const embed = new EmbedBuilder()
          .setColor(0xfeed7a)
          .setTitle('<a:check:1090645242425921667> 匿名頻道創建成功!')
          .setTimestamp()
          .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })

        const embedSend = new EmbedBuilder()
          .setColor(0xfeed7a)
          .setTitle(`<a:check:1090645242425921667> | 匿名聊天頻道設定成功!`)
          .setDescription('請使用指令 `/nickchat send` 來傳送一則匿名訊息!')
          .setTimestamp()
          .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
            
        interaction.client.channels.cache.get(channelId).send({embeds: [embedSend]}).catch(async e => {
          if (!e.message === 'Missing Permissions') {
            return await interaction.reply({content: '創建失敗，因為我沒有管理員權限...', ephemeral: true})
          }
          console.log(colors.red('[ERROR]') + '創建匿名聊天頻道時發生錯誤:' + e.message)
          console.log(e)
          return await interaction.reply({content: '呃... 這裡有一些錯誤...', ephemeral: true})
        }).then((msg) => msg.pin())

        userlog.push({
          channelId: channelId,
          serverId: serverId,
          logId: logch.id,
        });
        fs.writeFileSync(filePath, JSON.stringify(userlog, null, 2)); 
        await interaction.reply({ embeds: [embed], ephemeral: true });
        return
      case 'send':
        const obj = JSON.parse(data)
        const index = obj.findIndex(entry => entry.channelId === interaction.channelId)

        const msg = interaction.options.getString('message')
        const img = interaction.options.getAttachment('image')
        const reply = interaction.options.getString('reply')
        if (index != -1) {
          const code = getCode()
          
          if (msg.length >= 1000) msg = msg.substring(0, 1000) + '...'
          if (img) return interaction.channel.send({content: `**[${interaction.guild.name} | 匿名聊天 › 圖片][\`${code}\`]**: ${msg}`, files: [img.url]}).then(await interaction.reply({content: '發送成功!', ephemeral: true}))
          if (reply) {
            if (!interaction.client.channels.cache.get(interaction.channelId).messages.fetch(reply)) return await interaction.reply({content: '...? 你確定你的訊息ID是正確的?\n(訊息ID範例:`1114886717896392764`)\n(複製方法: **在訊息上按下`shift`，在選單內選擇`複製訊息ID`，並給我第二個ID)', ephemeral: true})
            await interaction.reply({content: '發送成功!', ephemeral: true})
            return interaction.channel.send({content: `**[${interaction.guild.name} | 匿名聊天 › 回覆][\`${code}\`]**: ${msg}`, reply: { messageReference: reply }})
          }

          const logSend = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`<:chaticon:1106782269613543484> › ${interaction.guild} 的匿名聊天紀錄`)
            .addFields({name: '發送者', value: interaction.user.tag, inline: true})
            .addFields({name: '發送頻道', value: interaction.channel.name, inline: true})
            .addFields({name: '發送訊息', value: msg, inline: false})
            .setTimestamp()
            .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })

          await interaction.reply({content: '發送成功!', ephemeral: true})

          interaction.channel.send({content: `**[${interaction.guild.name} | 匿名聊天][\`${code}\`]**: ${msg}`})

          fs.readFile(filePath, 'utf8', (err, data) => {
            const jsonData = JSON.parse(data);
            const channelIdToFind = interaction.channelId
            for (const obj of jsonData) {
              if (obj.channelId === channelIdToFind) {
                const logId = obj.logId;
                interaction.client.channels.cache.get(logId).send({embeds: [logSend], content: code}).catch(err => {
                  if (err.message === 'Missing Access') return
                })
                break
              }
            }
          })
        } else {
          return await interaction.reply({content: '<a:fail:1090648696900833321> | 錯誤! 這個頻道好像不是匿名頻道?'})
        }
        return
    }
  }
};