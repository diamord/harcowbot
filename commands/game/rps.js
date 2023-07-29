const { SlashCommandBuilder } = require('discord.js')
const { RockPaperScissors } = require('discord-gamecord')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rps')
		.setNameLocalizations({
			'zh-TW': '剪刀石頭布',
		})
		.setDescription('玩一場剪刀石頭布!')
        .addUserOption(user => user.setName('user').setDescription('和誰玩?').setRequired(true)),
	async execute(interaction) {
    const user = interaction.options.getUser('user')

    const Game = new RockPaperScissors({
        message: interaction,
        isSlashGame: true,
        opponent: user,
        embed: {
          title: '剪刀石頭布',
          color: '#524489',
          statusTitle: '遊玩中',
          overTitle: '遊戲結束',
          description: '請點擊按鈕來玩!'
        },
        emojis: {
          xButton: '❌',
          oButton: '🔵',
          blankButton: '➖'
        },
        buttons: {
          rock: '石頭',
          paper: '布',
                scissors: '剪刀'
        },
        emojis: {
          rock: '🌑',
          paper: '📰',
          scissors: '✂️'
        },
        mentionUser: true,
        timeoutTime: 60000,
        buttonStyle: 'PRIMARY',
        pickMessage: '你選擇了: `{emoji}`',
        winMessage: '本次由 **{player}** 獲勝!',
        tieMessage: ':thinking: | 平手...',
        timeoutMessage: ':thinking: | 已超過時間(6秒) 自動結束遊戲!',
        playerOnlyMessage: '只有 {player} 和 {opponent} 才能玩! ~~滾出去~~',
        requestMessage: '{player} 邀請你玩**剪刀石頭布**!',
        reqTimeoutMessage: '**遊戲結束!** 沒有人(?)想玩!',
        buttons: {
          accept: '允許',
          reject: '拒絕'
        }
      });
          
      Game.startGame();
      Game.on('gameOver', async (msg, result) => {
        return
      });
	}
};