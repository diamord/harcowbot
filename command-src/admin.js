const { SlashCommandBuilder } = require('discord.js')

const commands = new SlashCommandBuilder()
    .setName('botadmin')
    .setNameLocalizations({
        'zh-TW': '機器管理',
    })
    .setDescription('機器人的管理者執行操作')
    .addSubcommandGroup(subcommand => subcommand.setName('ban')
        .setNameLocalizations({
            'zh-TW': '黑名單',
        })
        .setDescription('黑名單用途: 讓使用者無法使用指令')
        .addSubcommand(subcommand => subcommand.setName('add')
            .setNameLocalizations({
                'zh-TW': '新增',
            })
            .setDescription('新增用戶至黑名單')
            .addUserOption(option => option.setName('user')
                .setNameLocalizations({
                    'zh-TW': '使用者',
                })
                .setDescription('新增黑名單的使用者')
                .setRequired(true)
            )
            .addStringOption(option => option.setName('reason')
                .setNameLocalizations({
                    'zh-TW': '原因',
                })  
                .setDescription('為甚麼要這麼做...(x 原因')
                .setRequired(true))
        )
        .addSubcommand(subcommand => subcommand.setName('remove')
            .setNameLocalizations({
                'zh-TW': '移除',
            })
            .addUserOption(option => option.setName('user')
                .setNameLocalizations({
                    'zh-TW': '使用者',
                })
                .setDescription('移除黑名單內的使用者')
                .setRequired(true)
            )
            .setDescription('移除在黑名單內的用戶'))
        .addSubcommand(subcommand => subcommand.setName('list')
            .setNameLocalizations({
                'zh-TW': '列出',
            })
            .setDescription('列出所有機器黑名單的用戶'))
    )

module.exports = commands