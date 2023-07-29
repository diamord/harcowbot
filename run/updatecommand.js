const { EmbedBuilder } = require('discord.js')
function update() {
    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('上次更新內容(v1.12.0)')
        .addFields(
            { name: '**==========新增指令==========**', value: '\n' },
            { name: '`/ticket`', value: '客服單系統(可查看紀錄)' },
            { name: '╚ `create` [channel] [createticket] (description) (log)' , value: '在 [channel] 創建一個ticket按鈕 點擊後將在 [createticket] 創建一個頻道'},
            { name: '╚ `remove` 移除' , value: '\n'},
            { name: '`/announcement`' , value: '公告一則使用Embed的訊息'},
            { name: '\n', value: '\n' },
            { name: '`/texttoimage` [text] (color) (bgcolor) (size)', value: '將文字([text])轉成圖片\n`(color)`文字顏色 `(bgcolor)`背景顏色 `(size)`文字大小' },
        )
        .setTimestamp()
        .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' })
    return embed
}
  
module.exports = update