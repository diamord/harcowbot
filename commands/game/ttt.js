const { SlashCommandBuilder } = require('discord.js')
const { TicTacToe } = require('discord-gamecord')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tictactoe')
		.setNameLocalizations({
			'zh-TW': '圈圈叉叉',
		})
		.setDescription('和一個人玩圈圈叉叉!')
    .addUserOption(user => user.setName('user').setDescription('和誰玩?').setRequired(true)),
	async execute(interaction) {
        const user = interaction.options.getUser('user')

        const Game = new TicTacToe({
            message: interaction,
            isSlashGame: true,
            opponent: user,
            embed: {
              title: 'Tic Tac Toe(圈圈叉叉)',
              color: '#181741',
              statusTitle: '遊玩中',
              overTitle: '遊戲結束'
            },
            emojis: {
              xButton: '❌',
              oButton: '🔵',
              blankButton: '➖'
            },
            mentionUser: true,
            timeoutTime: 60000,
            xButtonStyle: 'DANGER',
            oButtonStyle: 'PRIMARY',
            turnMessage: '<a:jerryoh:1106759453522530304> | `{player}` 換你了!',
            winMessage: '<a:jerryoh:1106759453522530304> | `{player}` 獲勝!!',
            tieMessage: ':thinking: | 平手...',
            timeoutMessage: ':thinking: | 已超過時間(6秒) 自動結束遊戲!',
            playerOnlyMessage: '只有 {player} & {opponent} 可以玩!',
            requestMessage: '{player} 邀請你玩**圈圈叉叉**!',
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