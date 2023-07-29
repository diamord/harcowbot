const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const colors = require('colors/safe')

const nowTime = require('../run/time.js')
const admin = require('../run/admins.js')

const fs = require('fs');
const path = require('path')

const row = new ActionRowBuilder()
	.addComponents(
    	new ButtonBuilder()
			.setCustomId('okay')
            .setLabel('允許')
            .setEmoji('1090645242425921667')
            .setStyle(ButtonStyle.Success),
    )
	.addComponents(
    	new ButtonBuilder()
			.setCustomId('no')
            .setLabel('拒絕')
            .setEmoji('1090648696900833321')
            .setStyle(ButtonStyle.Danger),
    )
	.addComponents(
    	new ButtonBuilder()
			.setURL('https://bit.ly/3pJgh1G')
            .setLabel('規則連結')
            .setEmoji('1090650682589196370')
            .setStyle(ButtonStyle.Link),
    )

const embed = new EmbedBuilder()
    .setColor('Green')
    .setTitle(`<:slashcommand:1103689912424857662> | 歡迎使用蝦餃機器人!請先閱讀下列規則:`)
	.setDescription('給我看喔...')
    .setTimestamp()
    .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' });

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		const filePath = path.join(__dirname, '../jsons', 'banuser.json');
		const data = fs.readFileSync(filePath)
		const fp2 = path.join(__dirname, '../jsons', 'user.json');
		const data2 = fs.readFileSync(fp2);
		const d = JSON.parse(data2)

		if (!interaction.guild) return await interaction.reply('你他媽再給我不在伺服器執行看看:(')
		if (!interaction.isChatInputCommand()) return;
		
		if (!d.users.includes(interaction.user.id)) {
			try {
				const res = await interaction.reply({embeds: [embed], components: [row], ephemeral: true})
				const cf = i => i.user.id === interaction.user.id
				const collector = await res.awaitMessageComponent({ cf, time: 60_000 });

				if (collector.customId === 'okay') {
					d.users.push(interaction.user.id)
					const updatedData = JSON.stringify(d)
					fs.writeFileSync(fp2, updatedData, 'utf8');
					await collector.update({ content: `<@${interaction.user.id}> 歡迎您使用**蝦餃機器人**並同意規則! 再執行一次指令吧!\n\`(提示: 可點擊指令來快速複製)\``, components: [], embeds: [], ephemeral: true });
				} else if (collector.customId === 'no') {
					await collector.update({ content: '好的 不同意的話那沒有關係:( 如果後來還是想要的話那就再執行一次:0', components: [], embeds: [], ephemeral: true });
				}
				return
			} catch (e) {
				return await interaction.editReply({ content: '按鈕已超過1分鐘尚未回覆 已自動移除 要不要再試一次?', components: [], embeds: [] })
			}
		}

		const obj = JSON.parse(data);
		const index = obj.findIndex(entry => entry.userid === interaction.user.id)
		
		if (index === -1) {
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) {
				console.log(`找不到 /${interaction.commandName} :(`);
				return;
			}

			let embed = new EmbedBuilder()

			try {
				await command.execute(interaction);
				
				let isAdmin

				if (interaction.commandName === 'nickchat') return
				if (admin.includes(interaction.user.id)) isAdmin = '是'
				else isAdmin = '否'

				console.log(colors.green('[LOG] ') + `[${nowTime()}] ${interaction.user.tag}(ID: ${interaction.user.id}) 在 ${interaction.guild} => ${interaction.channel.name} 使用指令 ${interaction}(是否為管理員: ${isAdmin})`)

				embed.setColor('Yellow').setTitle('指令使用').setAuthor({name: `${interaction.guild}`, iconURL: interaction.guild.iconURL()}).addFields(
					{ name: '使用者', value: `${interaction.user.username}` , inline: true},
					{ name: '位置', value: `${interaction.guild} -> ${interaction.channel.name}` , inline: true},
					{ name: '指令', value: `${interaction}` , inline: false},
				).setTimestamp().setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' });

				await interaction.client.channels.cache.get('1118453096805306368').send({embeds: [embed]})
			} catch (error) {
				console.log(colors.red('[ERROR]') + ` [${nowTime()}] 執行 ${interaction} 時出錯! ${error}`);
				console.log(error)

				if (error.message === 'Missing Permissions') return await interaction.channel.send('抱歉 我沒有創建一些東西的權限... 請確保是否有給我權限!')

				embed.setColor('Red').setTitle('錯誤').setAuthor({name: `${interaction.guild}`, iconURL: interaction.guild.iconURL()}).addFields(
					{ name: '使用者', value: `${interaction.user.username}` , inline: true},
					{ name: '位置', value: `${interaction.guild} -> ${interaction.channel.name}` , inline: true},
					{ name: '錯誤名稱', value: `${error.message}` , inline: false},
				).setTimestamp().setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' });

				const embedErr = new EmbedBuilder().setColor('Red').setTitle('糟糕...一大堆名字叫做**\`BUG\`**的蟲子爬了出來!').setDescription(`錯誤名稱: \`${error.message}\``).setTimestamp().setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' });

				await interaction.client.channels.cache.get('1118453096805306368').send({embeds: [embed]})
				await interaction.channel.send({embeds: [embedErr]})
			}
		} else {
			return await interaction.reply({content: `您已被 \`${JSON.parse(data)[index].admintag}\` 設為本機器人的黑名單 請私訊 <@1073913037037244546> 來與管理員進行請求或對話\n(原因: \`${JSON.parse(data)[index].why}\`)`, ephemeral: true})
		}	
	},
};