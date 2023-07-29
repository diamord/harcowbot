const { EmbedBuilder } = require('discord.js')

const admin = require('../../run/admins.js')

const fs = require('fs')
const path = require('path');

const banfile = path.join(__dirname, '../..', 'banuser.json');

const readUserLog = function () {
    try {
        const filePath = path.join(__dirname, '../..', 'banuser.json');
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (err) {
        console.log(err);
        return [];
    }
};

const colors = require('colors/safe')
const nowTime = require('../../run/time.js')

module.exports = {
data: require('../../command-src/admin.js'),
async execute(interaction) {
        if (!admin.includes(interaction.user.id)) return await interaction.reply({content: '真相永遠只有一個! 你沒有權限:)', ephemeral: true})
        const command = interaction.options.getSubcommand()
        const group = interaction.options.getSubcommandGroup() 
        if (group === 'ban') {
            if (command === 'add') {
                const user = interaction.options.getUser('user')
                const why = interaction.options.getString('reason')
                const userlog = readUserLog();
                userlog.push({
                    usertag: user.tag,
                    userid: user.id,
                    why: why,
                    admintag: interaction.user.tag,
                    adminid: interaction.user.id
                });
                fs.writeFileSync(banfile, JSON.stringify(userlog, null, 2));
                await interaction.reply(`成功將 ${user.tag} 加入黑名單:)`)
                console.log(colors.black('[BLACKLIST] ') + `[${nowTime()}] ${interaction.user.tag} 將 ${user.tag} 加入黑名單`)
            } else if (command === 'remove') {
                const arr = readUserLog()
                const user = interaction.options.getUser('user')
                const index = arr.findIndex(entry => entry.userid === user.id)

                if (index !== -1) {
                  arr.splice(index, 1);
                }

                const newData = JSON.stringify(arr, null, 2);
                fs.writeFileSync(banfile, newData);
                await interaction.reply({content: `已移除 \`${user.tag}\` 的黑名單!`, ephemeral: true});
                console.log(colors.black('[BLACKLIST] ') + `[${nowTime()}] ${interaction.user.tag} 把 ${user.tag} 移出黑名單`)
                return
            } else if (command === 'list') {
                const filePath = path.join(__dirname, '../..', 'banuser.json');
                const jsonData = fs.readFileSync(filePath);
                const data = JSON.parse(jsonData);
                const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('目前黑名單列表')
                .setDescription('底下的人都是一些怪人:)')

                data.forEach(entry => {
                    embed.addFields({name: entry.usertag, value: `原因: ${entry.why}\n封鎖者: ${entry.admintag}\nID: ${entry.userid}`, inline: true})
                });

                await interaction.reply({embeds: [embed], ephemeral: true})
            }
        }
    }
};