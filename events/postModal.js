const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.customId != 'modal') return

        const title = interaction.fields.getTextInputValue('title');
	    const description = interaction.fields.getTextInputValue('description');
        const pin = interaction.fields.getTextInputValue('pin')
        let isPin

        if (pin.length > 0) isPin = true
        
        const embed = new EmbedBuilder().setTitle(`${title}`).setDescription(`${description}`).setColor('Random').setAuthor({name: `${interaction.user.username} 所發的公告`, iconURL: interaction.user.avatarURL()})

        await interaction.channel.send({embeds: [embed]}).then((msg) => {
            if (isPin) msg.pin()
        }).catch(async (e) => {
            return await interaction.reply({content: ':thinking: | 我似乎沒有權限?', ephemeral: true})
        })
         
        await interaction.reply({content: '<a:check:1090645242425921667> | 公告已成功發送!', ephemeral: true})
	},
};