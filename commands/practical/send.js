const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('msg')
        .setNameLocalizations({
            'zh-TW': '傳送訊息',
        })
		.setDescription('幫你發送訊息')
        .addSubcommand(subcommand => subcommand.setName('say')
            .setNameLocalizations({
                'zh-TW': '機器發送',
            })
            .setDescription('用機器人來發送一則訊息')
            .addStringOption(option =>
                option.setName('text')
                    .setDescription('文字')
                    .setRequired(true))
        )
        .addSubcommand(subcommand => subcommand.setName('webhook')
            .setNameLocalizations({
                'zh-TW': '替身發送',
            })
            .setDescription('用其他人的身分來發送訊息(因此功能有被投訴經驗 請勿使用它來違反伺服器規則)')
            .addStringOption(option =>
                option.setName('text')
                    .setDescription('文字')
                    .setRequired(true))
            .addUserOption(option =>
                option.setName('user')
                    .setDescription('仿冒的使用者')
                    .setRequired(false))
        ),
	async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: ':thinking: 你沒有權限能夠執行此指令:)', ephemeral: true})
        
        const msg = interaction.options.getString('text')
        switch (interaction.options.getSubcommand()) {
            case 'say': 
                await interaction.reply({content: `已發送訊息: \`${msg}\``, ephemeral: true})
                await interaction.channel.send(`${msg}`)
                return
            case 'webhook':
                let user = interaction.options.getUser('user')
                if (!user) user = interaction.user
                const name = user.username
                const av = user.avatarURL()

                await interaction.deferReply({ ephemeral: true })
                await interaction.editReply({content: `<a:loading:1101100808231194664> 正在創建並發送...`})

                const webhook = await interaction.channel.createWebhook({
                    name: name,
                    avatar: av,
                    channel: interaction.channel
                })

                await interaction.editReply({content: `已使用: ${user} 的身分發送訊息: \`${msg}\``})
                await webhook.send(`${msg}`)
                return
        }
	}
};