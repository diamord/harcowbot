const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, PermissionsBitField, ButtonBuilder, ButtonStyle } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('transcript')
        .setDescription('備份一個頻道的歷史訊息')
        .setNameLocalizations({
            'zh-TW': '備份訊息',
        })
        .addNumberOption(option =>
			option.setName('message')
				.setNameLocalizations({
					'zh-TW': '數量',
				})
                .setMaxValue(10000)
                .setMinValue(1)
				.setDescription('要備份訊息的數量(最多10000)')
				.setRequired(false)),
    async execute(interaction) {
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({content: ':thinking: 你沒有管理訊息的權限?', ephemeral: true})

            await interaction.deferReply()
            
            const count = interaction.options.getNumber('message') || 100

            await interaction.editReply({content: '<a:loading:1101100808231194664> 正在創建這個頻道的訊息檔案...這**可能(?)**不需要很久', ephemeral: true})

            const file = await createTranscript(interaction.channel, {
                limit: count,
                returnBuffer: false,
                filename: `${interaction.channel.name.toLowerCase()}-ct.html`
            })
            
            let cache = interaction.client.channels.cache.get('1114367299114258445')
            let msg = await cache.send({files: [file]})

            const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setLabel('打開').setURL(`https://mahto.id/chat-exporter?url=${msg.attachments.first()?.url}`).setStyle(ButtonStyle.Link),
                new ButtonBuilder().setLabel('下載').setURL(`${msg.attachments.first()?.url}`).setStyle(ButtonStyle.Link)
            )

            const embed = new EmbedBuilder()
            .setColor("Random")
            .setDescription(`<a:check:1090645242425921667> | 準備就緒! **${interaction.channel.name}**的\`${count}\`則訊息的備份連結如下:`)

            await interaction.editReply({embeds: [embed], content: '', components: [button], ephemeral: false})
        }
    };