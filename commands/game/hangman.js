const { SlashCommandBuilder } = require('discord.js')
const { Hangman } = require('discord-gamecord')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hangman')
        .setDescription('玩一場猜字母遊戲!')
        .setNameLocalizations({
			'zh-TW': '猜單字',
		}),
    async execute(interaction) {
        const Game = new Hangman({
            message: interaction,
            isSlashGame: true,
            embed: {
              title: '猜單字(Hangman)',
              color: '#8845C0'
            },
            hangman: { hat: '👒', head: '🫠', shirt: '👚', pants: '🩳', boots: '👞👞' },
            timeoutTime: 60000,
            theme: 'wordle',
            winMessage: '`❤️ | 獲勝! 你猜到單字了! ( {word} )`',
            loseMessage: '`😞 | 你失敗了... 正確單字為: "{word}" !再試一次?`',
            timeoutMessage: ':thinking: | 已超過時間(6秒) 自動結束遊戲!',
            playerOnlyMessage: '只有 {player} 可以玩!'
        });
          
        Game.startGame();
        Game.on('gameOver', async result => {
            return
        });
    }
}