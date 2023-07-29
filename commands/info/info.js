const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function time (ms) {
  let seconds = ms / 1000;
  const day = parseInt(seconds / 86400)
  seconds = seconds % 86400
  const hours = parseInt(seconds / 3600); 
  seconds = seconds % 3600; 
  const minutes = parseInt(seconds / 60);
  seconds = seconds % 60;
  return('**```' + `${day}` + ' 天 ' + `${hours}` + ' 時 ' + `${minutes}` + ' 分 ' + `${~~(seconds)}`+' 秒```**');
}
function pingIcon (ms) {
  if (ms >= 500){
    return '<:ping3:1103865638855921744>'
  } else if (ms >= 200){
    return '<:ping2:1103865643041820692>'
  } else if (ms < 200){
    return '<:ping1:1103865645784891463>'
  }
}

module.exports = {
  data: new SlashCommandBuilder()
  .setName('info').setNameLocalizations({'zh-TW': '簡介',}).setDescription('各種東西的簡介')
  .addSubcommand(subcommand => subcommand.setName('user').setNameLocalizations({'zh-TW': '使用者',}).setDescription('使用者簡介')
    .addUserOption(option => option.setName('user').setNameLocalizations({'zh-TW': '使用者',}).setDescription('要查看的用戶').setRequired(false))
  )
  .addSubcommand(subcommand => subcommand.setName('server').setNameLocalizations({'zh-TW': '伺服器',}).setDescription('這個伺服器的簡介'))
  .addSubcommand(subcommand => subcommand.setName('bot').setNameLocalizations({'zh-TW': '機器人',}).setDescription('我的簡介!')),

  async execute(interaction) {
    if (!interaction.guild) return await interaction.reply('請至伺服器再執行此指令')
    const subCommand = interaction.options.getSubcommand()
    if (subCommand === 'user') {
      const un = interaction.options.getUser('user') || interaction.user
      const member = await interaction.guild.members.cache.get(un.id)
      const roles = member.roles.cache.map(r => r.toString());
      let output = '';
      for (let i = 0; i < roles.length; i++) {
      output += roles[i];
      if (i % 3 === 1) {
      output += '\n';
      } else {
      output += ' ';
      }
      }
      const userinfo = new EmbedBuilder()
      .setColor(0x5ee57c)
      .setAuthor({name: `${un.tag} 的個人簡介:0`, iconURL: un.displayAvatarURL()})
      .addFields(
        { name: '使用者名稱', value: `${un}` , inline: true},
        { name: '使用者ID', value: `\`${un.id}\`` , inline: true},
        { name: '在此伺服器擁有身分組', value: `${output}` , inline: false},
        { name: '加入伺服器時間', value: `<t:${parseInt(member.joinedAt / 1000)}:R>` , inline: true},
        { name: '創建此帳號時間', value: `<t:${parseInt(member.user.createdAt / 1000)}:R>` , inline: true},
      )
      await interaction.reply({ embeds: [userinfo]});
    } else if (subCommand === 'server') {
      const { guild } = interaction
      let glv = guild.verificationLevel
      let gblv = guild.premiumSubscriptionCount
      let gbc = guild.premiumSubscriptionCount

      if (gblv == 0) gblv = '無加成'
      else if (gblv == 1) gblv = `無等級 (加成次數: \`${gbc}\`)`
      else if (gblv <= 7) gblv = `<:booster1:1091539760079708280> (加成次數: \`${gbc}\`)`
      else if (gblv <= 14) gblv = `<:booster2:1091539765955932200> (加成次數: \`${gbc}\`)`
      else if (gblv >= 15) gblv = `<:booster3:1091539763619708988> (加成次數: \`${gbc}\`)`

      if (glv == 0) glv = '無 (⬛⬛⬛⬛)'
      else if (glv == 1) glv = '低 (🟥⬛⬛⬛)'
      else if (glv == 2) glv = '中 (🟨🟨⬛⬛)'
      else if (glv == 3) glv = '高 (🟩🟩🟩⬛)'
      else if (glv == 4) glv = '最高 (🟦🟦🟦🟦)'
      else glv = '未知'

      const exampleEmbed = new EmbedBuilder()
        .setColor(0x7b2548)
        .setAuthor({name: `${interaction.guild.name} 的伺服器簡介`})
        .setThumbnail( `${interaction.guild.iconURL()}`)
        .addFields(
          { name: '伺服器ID', value: `\`${guild.id}\`` , inline: false},
          { name: '創建者', value: `<@${guild.ownerId}>` , inline: true},
          { name: '伺服器名稱', value: `${guild.name}` , inline: true},
          { name: '伺服器成員數', value: `${guild.memberCount}` , inline: true},
          { name: '伺服器頻道數', value: `${guild.channels.cache.size}` , inline: true},
          { name: '伺服器表情數', value: `${guild.emojis.cache.size}` , inline: true},
          { name: '伺服器身分組數', value: `${guild.roles.cache.size}` , inline: true},
          { name: '伺服器創群時間', value: `<t:${~~(guild.createdAt/1000)}:R>` , inline: true},
          { name: '伺服器驗證等級', value: `${glv}` , inline: true},
          { name: '伺服器加成等級', value: `${gblv}` , inline: true},
          { name: '伺服器說明', value: `${guild.description || '無'}` , inline: false},
        )
        .setTimestamp()
        .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
      await interaction.reply({embeds: [exampleEmbed]})
    } else if (subCommand === 'bot') {
      const bot = interaction.client
      const embed = new EmbedBuilder()
      .setColor(0x1a2385)
      .setAuthor({name: `我的個人簡介! (${bot.user.tag})`, iconURL: bot.user.avatarURL()})
      .addFields(
        { name: '上線時間', value: `${time(bot.uptime)}` , inline: false},
        { name: '\u0020', value: '\u0020'},
        { name: '我的名稱', value: `\`${bot.user.tag}\`` , inline: true},
        { name: '我的ID', value: `\`${bot.user.id}\`` , inline: true},
        { name: '我的老大(x)創建者', value: `<@943832407247822859>` , inline: true},
        { name: '開發時間', value: `\`2023/2/11\`` , inline: true},
        { name: '\u0020', value: '\u0020'},
        { name: '服務伺服器數', value: `**\`${bot.guilds.cache.size}\`**` , inline: true},
        { name: '服務成員數', value: `**\`${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\`**` , inline: true},
        { name: '\u0020', value: '\u0020'},
        { name: '連線狀態', value: `${pingIcon(interaction.client.ws.ping)} (\`${interaction.client.ws.ping}\` ms)`, inline: true},
      )
      .setTimestamp()
      .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
      await interaction.reply({ embeds: [embed] });
    }
  }
};