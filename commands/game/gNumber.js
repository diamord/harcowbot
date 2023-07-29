const { SlashCommandBuilder , ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events} = require('discord.js');
const numberReaction = require('../../run/gNumberRemainReaction.js')

module.exports = {
	data: new SlashCommandBuilder() 
		.setName('guessnumber')
        .setNameLocalizations({
            'zh-TW': '猜數字',
        })
		.setDescription('猜一個數字!'),
	async execute(interaction) {
        await interaction.deferReply()

        const randomNumber = Math.floor(Math.random() * 1000) + 1

        let remain = 10

        const embed = new EmbedBuilder()
        .setColor(0x2F3136)
        .setTitle(`<a:uh_thinking:1090650572954279977> | 猜數字! 輸入數字來遊玩!`)
        .setDescription('你有 **`10`** 次機會!(範圍: `1` ~ `1000`)')
        .setTimestamp()
        .addFields(
            { name: '差距評分', value: '你的差距就會有如下的評分:' , inline: false},
            { name: '800~601', value: '`太遠了`' , inline: true},
            { name: '600~401', value: '`有點遠`' , inline: true},
            { name: '400~201', value: '`一點點近`' , inline: true},
            { name: '200~51', value: '`蠻近的喔`' , inline: true},
            { name: '50~10', value: '`非常近!`' , inline: true},
            { name: '9~1', value: '`超級超級近!`' , inline: true},
        )
        .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })

        const msg = await interaction.followUp({embeds: [embed]})

        const c = interaction.channel.createMessageCollector({ filter: m => m.author.id === interaction.user.id })

        c.on('collect', m => {
            if (!/\d+/.test(m.content)) return

            const embedForEnd = new EmbedBuilder()
                .setColor('DarkRed')
                .setTitle(`<a:fail:1090648696900833321> | 結束! 你好像不想玩?`)
                .setDescription(`請輸入正確的數字!`)
                .setTimestamp()
                .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })

            const guess = parseInt(m.content, 10)

            if (guess > 1000 || guess < 0) {
                m.react('❌')
                msg.edit({embeds: [embedForEnd]})
                c.stop()
                return
            }

            remain = remain - 1

            if (remain === 0) {
                m.react('💀')
                
                const embedForFail = new EmbedBuilder()
                .setColor('DarkRed')
                .setTitle(`<a:fail:1090648696900833321> | 失敗:( 你的機會用光了!`)
                .setDescription(`正確數字為: \`${randomNumber}\` !`)
                .setTimestamp()
                .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })

                msg.edit({embeds: [embedForFail]})

                c.stop()
                return
            }

            if (guess === randomNumber) {
                m.react(numberReaction('✅'))

                const embedForWin = new EmbedBuilder()
                .setColor('Green')
                .setTitle(`<a:check:1090645242425921667> | 恭喜 ${interaction.user.username} 答對!`)
                .setDescription(`正確數字為: \`${randomNumber}\` !\n猜的次數: \`${10 - remain}\``)
                .setTimestamp()
                .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })

                msg.edit({embeds: [embedForWin]})

                c.stop()
                return
            }

            let gap

            m.react(numberReaction(remain))

            if (guess > randomNumber) {
                gap = guess - randomNumber
                if (gap > 800) gap = '太遠了'
                else if (gap >= 600) gap = '有點遠'
                else if (gap >= 400) gap = '中等'
                else if (gap >= 200) gap = '一點點近'
                else if (gap >= 50) gap = '蠻近的喔'
                else if (gap >= 10) gap = '非常近!'
                else if (gap <= 9) gap = '超級超級近!'

                embed.setTitle(`<a:uh_thinking:1090650572954279977> | 猜大了... (差距評分: \`${gap}\`)`).setDescription(`剩餘次數: ${remain}`).addFields()

                msg.edit({embeds: [embed]})
            } else if (guess < randomNumber) {
                gap = randomNumber - guess
                if (gap > 800) gap = '太遠了'
                else if (gap >= 600) gap = '有點遠'
                else if (gap >= 400) gap = '中等'
                else if (gap >= 200) gap = '一點點近'
                else if (gap >= 50) gap = '蠻近的喔'
                else if (gap >= 10) gap = '非常近!'
                else if (gap <= 9) gap = '超級超級近!'

                embed.setTitle(`<a:uh_thinking:1090650572954279977> | 猜小了... (差距評分: \`${gap}\`)`).setDescription(`剩餘次數: ${remain}`).addFields()

                msg.edit({embeds: [embed]})
            }
        })
	},
};