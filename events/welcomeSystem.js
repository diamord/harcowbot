const { Events, EmbedBuilder } = require('discord.js');

const fs = require('fs');
const path = require('path')

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(user) {
        const filePath = path.join(__dirname, '../jsons', 'ws.json')
		const data = JSON.parse(fs.readFileSync(filePath)).find(entry => entry.guildId === user.guild.id)
		
        if (!data) return

        const channel = await user.guild.channels.cache.get(data.channelId)
        const content = `${data.description.replace(`{username}`, user.user.username).replace(`{user}`, user).replace(`{guilduser}`, user.guild.memberCount).replace(`{line}`, '\n')}`

        const embed = new EmbedBuilder()
            .setColor('Random')
            .setAuthor({ name: `歡迎 ${user.user.username} !`, iconURL: user.user.avatarURL() })
            .setTitle(data.title.toString())
            .setDescription(content)
            .setTimestamp()
            .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })

        channel.send({ embeds: [embed] })

        if (data.role) user.roles.add(data.role).catch(err => { return })
	},
};