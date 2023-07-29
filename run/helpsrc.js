const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
function ezEB(num) {
    let embed
    if (num === 1) {
        embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({name: '蝦餃機器人幫助'})
            .setDescription('趣味指令')
            .addFields(
                { name: '/8ball', value: '神奇8號球' , inline: true},
                { name: '/dice', value: '骰子' , inline: true},
                { name: '/faketext', value: '假文產生器' , inline: true},
                { name: '/time', value: '現在時間', inline: true},
                { name: '/random', value: '隨機數字' , inline: true},
                { name: '/reaction', value: '反應力測試' , inline: true},
                { name: '/opme', value: '給你op:)', inline: true},
                { name: '/hi', value: 'Hi!' , inline: true},
                { name: '/gay', value: '查看gay機率' , inline: true},
                { name: '/meme', value: '給你看迷因' , inline: true},
                { name: '/kill', value: '殺一個人...?' , inline: true},
                { name: '/guessnumber', value: '猜數字' , inline: true},
            )
            .setTimestamp()
            .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
    } else if (num === 2) {
        embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({name: '蝦餃機器人幫助'})
            .setDescription('實用指令')
            .addFields(
                { name: '/translate', value: '翻譯' , inline: true},
                { name: '/av', value: '查看他人頭像' , inline: true},
                { name: '/dice', value: '骰子' , inline: true},
                { name: '/invite', value: '邀請我!' , inline: true},
                { name: '/texttoimage', value: '文字轉圖片' , inline: true},
                { name: '/wiki', value: '維基百科' , inline: true},
                { name: '/hi', value: 'Hi!' , inline: true},
                { name: '\n', value: '\n' , inline: false},
                { name: '/createinvite', value: '創建一個伺服器邀請連結' , inline: true},
                { name: '/announcement', value: '公告!' , inline: true},
                { name: '\n', value: '\n' , inline: false},
                { name: '/ai chat', value: '聊天機器人!' , inline: true},
                { name: '/ai image', value: '產生一個你想要的圖片' , inline: true},
                { name: '\n', value: '\n' , inline: false},
                { name: '/info server', value: '查看伺服器資訊' , inline: true},
                { name: '/info user', value: '查看某人的資訊' , inline: true},
                { name: '/info bot', value: '我的資訊!' , inline: true},
                { name: '\n', value: '\n' , inline: false},
                { name: '/get emoji', value: '獲取或在伺服器內新增emoji' , inline: true},
                { name: '/get bot', value: '獲取其他機器人的邀請' , inline: true},
                { name: '\n', value: '\n' , inline: false},
                { name: '/nickchat', value: '匿名聊天系統' , inline: true},
                { name: '/ticket', value: '客服單系統' , inline: true},
            )
            .setTimestamp()
            .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
    } else if (num === 3) {
        embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({name: '蝦餃機器人幫助'})
            .setDescription('其他指令')
            .addFields(
                { name: '/no', value: '?' , inline: true},
                { name: '/ping', value: '給你延遲' , inline: true},
                { name: '/support', value: '給我建議!(現在直接私訊我吧)' , inline: true},
                { name: '/color', value: '給你一點顏色瞧瞧' , inline: true},
                { name: '/help', value: '取得幫助(這個指令)' , inline: true},
            )
            .setTimestamp()
            .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
    } else if (num === 4) {
        embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({name: '蝦餃機器人幫助'})
            .setDescription('音樂指令(前綴皆為/music)')
            .addFields(
                { name: '這真尷尬...', value: '目前music指令正在製作與改良 期待以後吧!' , inline: true},
            )
            .setTimestamp()
            .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
    } else if (num === 5) {
        const c = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder('我不知道你要做啥 可是我可以給你看')
                    .addOptions(
                        {
                            label: '新增指令',
                            description: '最近更新的指令!',
                            emoji: '1106759453522530304',
                            value: 'update',
                        },
                        {
                            label: '趣味指令',
                            description: '一些(不怎麼樣的)遊戲 如: 反應力遊戲, 8號球',
                            emoji: '1090650370340049048',
                            value: '1',
                        },
                        {
                            label: '實用指令',
                            description: '一些很酷(才怪)的指令 如: ai,維基百科,表情符號獲取',
                            emoji: '1090649620222320812',
                            value: '2',
                        },
                        {
                            label: '其他指令',
                            description: '用不到或廢棄的指令',
                            emoji: '1090649525934375044',
                            value: '3',
                        },
                        {
                            label: '音樂指令',
                            description: '現在是音樂...時間!',
                            emoji: '1102807900298162267',
                            value: '4',
                        },
                    )
            )
        
        return c
    } else if (num === 6) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setURL('https://bit.ly/harcow')
                .setLabel('邀請我!')
                .setEmoji('1090649167224913950')
                .setStyle(ButtonStyle.Link),
                new ButtonBuilder()
                .setURL('https://discord.gg/KC2PXNRVRH')
                .setLabel('進入支援群組:D')
                .setEmoji('1090309083254497380')
                .setStyle(ButtonStyle.Link)
            );
        return row
    }
    return embed;
  }
  
module.exports = ezEB