const { Events, ActivityType } = require('discord.js');
var colors = require('colors/safe')
const nowTime = require('../run/time.js')

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log('========================')
    console.log(colors.bold(colors.rainbow('┏┓╋┏┓╋╋╋╋┏━━━┓╋╋╋╋╋╋╋╋┏━━━┓╋╋╋╋╋╋╋╋╋╋╋╋╋┏┳━━┓╋╋╋╋┏┓\n┃┃╋┃┃╋╋╋╋┃┏━┓┃╋╋╋╋╋╋╋╋┗┓┏┓┃╋╋╋╋╋╋╋╋╋╋╋╋╋┃┃┏┓┃╋╋╋┏┛┗┓\n┃┗━┛┣━━┳━┫┃╋┗╋━━┳┓┏┓┏┓╋┃┃┃┣┳━━┳━━┳━━┳━┳━┛┃┗┛┗┳━━╋┓┏┛\n┃┏━┓┃┏┓┃┏┫┃┏━┫┏┓┃┗┛┗┛┃╋┃┃┃┣┫━━┫┏━┫┏┓┃┏┫┏┓┃┏━┓┃┏┓┃┃┃\n┃┃╋┃┃┏┓┃┃┃┗┻━┃┗┛┣┓┏┓┏┛┏┛┗┛┃┣━━┃┗━┫┗┛┃┃┃┗┛┃┗━┛┃┗┛┃┃┗┓\n┗┛╋┗┻┛┗┻┛┗━━━┻━━┛┗┛┗┛╋┗━━━┻┻━━┻━━┻━━┻┛┗━━┻━━━┻━━┛┗━┛')))
    console.log('========================')
    console.log(colors.blue('[LOGIN]') + ` [${nowTime()}] ${client.user.tag} 已登入!`);
    console.log('========================')
    console.log(colors.yellow('[INFO]') + ` 服務伺服器: ${client.guilds.cache.size} , 服務成員數: ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`);
    let count = 0;

    setInterval(() => {
      count++;

      switch (count % 4) {
        case 0:
          client.user.setActivity('使用 /help 了解更多!', { type: ActivityType.Watching });
          break;
        case 1:
          client.user.setActivity(`服務 ${client.guilds.cache.size} 個伺服器中`, { type: ActivityType.Watching });
          break;
        case 2:
          client.user.setActivity(`服務 ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} 個使用者中`, { type: ActivityType.Watching });
          break;
        case 3:
          client.user.setActivity('私訊我來提供意見!', { type: ActivityType.Watching });
          break;
        case 4:
          client.user.setActivity('v1.12.0 | 客服單/文字轉圖片', { type: ActivityType.Watching });
          break;
      }
    }, 5000);
  },
};
