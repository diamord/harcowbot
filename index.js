// Import Modules
const fs = require('node:fs');
const path = require('node:path');

const { Client, Events, GatewayIntentBits, Collection, Partials, EmbedBuilder, ChannelType } = require('discord.js'); // discord JS

const client = new Client({
	intents: [
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
    	GatewayIntentBits.Guilds, 
    	GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.DirectMessages,
    	GatewayIntentBits.MessageContent,
	],
	allowedMentions: {
		repliedUser: false,
		parse: ['users', 'roles', 'everyone']
	},
	partials: [
		Partials.Channel,
		Partials.Message
	]
});
const { token } = require('./config.json');

const ezEB = require('./run/helpsrc.js')
const nowTime = require('./run/time.js')
const admin = require('./run/admins.js')
const update = require('./run/updatecommand.js')

const colors = require('colors/safe')

const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp');

const distube = new DisTube(client, {
	leaveOnStop: false,
	leaveOnEmpty: true,
	emitNewSongOnly: true,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
	plugins: [
	  new SpotifyPlugin({
		emitEventsAfterFetching: true
	  }),
	  new SoundCloudPlugin(),
	  new YtDlpPlugin()
	],
	searchSongs: 1
})

// Commands Collection
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
let allCommands = 0
let nowCommands = 0
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	allCommands += commandFiles.length;
}

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		nowCommands = nowCommands + 1
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
			console.log(colors.yellow('[COMMAND]') + ` [${nowTime()}] /${command.data.name} 正在讀取... (第 ${nowCommands} / ${allCommands}) 個指令`);
		} else {
			console.log(colors.red('[WARNING]') + ` /${filePath} 缺少必須的 'data' 或者 'execute' 属性`);
		}
	}
}

// Events Interaction
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) client.once(event.name, (...args) => event.execute(...args));
	else client.on(event.name, (...args) => event.execute(...args))
}

// Help SelectMenu
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isStringSelectMenu()) return;
	if (interaction.customId === 'select'){
		const selected = interaction.values[0]
		if (selected === '1') {
			await interaction.update({embeds: [ezEB(1)], components: [ezEB(5), ezEB(6)], ephemeral: true});
		}
		if (selected === '2') {
			await interaction.update({embeds: [ezEB(2)], components: [ezEB(5), ezEB(6)], ephemeral: true});
		}
		if (selected === '3') {
			await interaction.update({embeds: [ezEB(3)], components: [ezEB(5), ezEB(6)], ephemeral: true});
		}
		if (selected === '4') {
			await interaction.update({embeds: [ezEB(4)], components: [ezEB(5), ezEB(6)], ephemeral: true});
		}
		if (selected === 'update') {
			await interaction.update({embeds: [update()], components: [ezEB(5), ezEB(6)], ephemeral: true});
		}
  	}
})

// Support Command(DM)
client.on(Events.MessageCreate, async message => {
	if (message.guild || message.author.id == client.user.id) return
	if (message.author.id == '943832407247822859') {
		const str = message.content
		if (str.length > 19) {
			const sendStr = str.split(';')
			try {
				client.users.send('943832407247822859', `成功傳送訊息至: ${sendStr[0]}`)
				client.users.send(sendStr[0], `> **製作者或管理者(<@${message.author.id}>)對您回復:** \`${sendStr[1]}\`\n如有其他事情可繼續詢問或到蝦餃官方群組 https://discord.gg/KC2PXNRVRH 開單詢問`)
			} catch (e) {
				return console.log(colors.red('[ERROR]') + `[${nowTime()}] ${e}`)
			} finally {
				return
			}
		} else {
			return
		}
	}
    console.log(colors.yellow('[SUGGEST]') + ` [${nowTime()}] ${message.author.tag} (ID: ${message.author.id}) 提供意見: ${message.content}`)
	client.users.send(message.author.id, '感謝您的回覆!當作者看到後 就會回復你!')
	let x = 0
	admin.forEach(function(item, i) {
		x++
		if (x === 1) return
		console.log(x)
		client.users.send(item, `有人使用支援指令: \n 使用者名稱: ${message.author.tag}\n 使用者ID: \`${message.author.id}\`\n 訊息: \`${message.content}\``)
	});
})

// Join To Create Voice Channel
client.on(Events.VoiceStateUpdate, async (os, ns) => {
	try {
		if (ns.member.guild === null) return
	} catch (error) {
		return
	}

	const data = fs.readFileSync('./jsons/jtc.json')
	const obj = JSON.parse(data)
	const index = obj.find(entry => entry.guildId === ns.guild.id && entry.channelId === ns.channelId)

	const voiceChannel = ns.channel
	if (!voiceChannel || !index || ns.channel.name === `╚ ${ns.member.user.username} 的頻道`) return
	else {
		try {
			const channel = await ns.member.guild.channels.create({
				type: ChannelType.GuildVoice,
				name: `╚ ${ns.member.user.username} 的頻道`,
				parent: index.create
			})
			
			await ns.member.voice.setChannel(channel.id).catch((err) => { return })
		} catch (err) {
			console.log(err)
		}
	}
})
client.on(Events.VoiceStateUpdate, async (os, ns) => {
	try {
		if (os.member.guild === null) return
	} catch (e) {
		return
	}

	if (!os) return
	else {
		try {
			const regex = /^╚ (.*) 的頻道$/
			const chName = os.channel.name
			const match = chName.match(regex)

			if (!match || os.channel.members.size != 0) return
			else {
				const vc = os.member.guild.channels.cache.get(os.channelId)

				vc.delete().catch((err) => { return })
			}
		} catch (err) {
			return
		}
	}
})

// Music (只能寫在主檔了...)
client.on(Events.InteractionCreate, async (interaction) => {
	if (interaction.commandName === 'music-play') {
		if (!interaction.member.voice.channel) return interaction.reply({ content: '❌ 請先進到語音頻道!!!', ephemeral: true });
		distube.play(interaction.member.voice.channel, interaction.options.getString('keyword'), {
			member: interaction.member,
			textChannel: interaction.channel,
			interaction
		})

		await interaction.reply({content: '成功執行!', ephemeral: true})

		
	} else if (interaction.commandName === 'music-stop') {
		distube.stop(interaction)

		await interaction.reply({content: '成功執行!', ephemeral: true})
	} else if (interaction.commandName === 'music-resume') {
		distube.resume(interaction)

		await interaction.reply({content: '成功執行!', ephemeral: true})
	} else if (interaction.commandName === 'music-leave') {
		distube.voices.get(interaction)?.leave()

		await interaction.reply({content: '成功執行!', ephemeral: true})
	}
})
distube.on('playSong', async (queue, song) => {
	await queue.textChannel?.send({ embeds: [ new EmbedBuilder().setColor('Green').setTitle('🎶 開始播放!').setDescription(`\`${song.name}\`\n(**${song.url}**)`).setTimestamp().setThumbnail(song.thumbnail).setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })] })
})
.on('disconnect', async (queue, song) => {
	await queue.textChannel?.send({ embeds: [ new EmbedBuilder().setColor('Green').setTitle('🎶 結束播放! 我被趕出去了...').setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })] })
})
.on('error', async err => {
	return
})



// Anti Crash
process
    .on('unhandledRejection', async (err, promise) => {
        console.log(colors.red(`[ANTI-CRASH] `) +  `[${nowTime()}] 未處理的拒絕： ${err}`);
        console.log(err)
    })
    .on('uncaughtException', async (err, promise) => {
        console.log(colors.red(`[ANTI-CRASH] `) +  `[${nowTime()}] 未處理的拒絕： ${err}`);
        console.log(err)
    })

client.login(token)