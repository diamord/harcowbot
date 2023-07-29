const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path')
const color = require('colors/safe')
const Table = require('cli-table3')

	const commands = [];
	const foldersPath = path.join(__dirname, 'commands');
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
			} else {
				console.log(color.yellow(`[WARNING]`) + `斜線指令: ${filePath} 缺少需求的 "data" 或 "execute" 元素!`);
			}
		}
	}
	const rest = new REST({ version: '10' }).setToken(token);

	(async () => {
		try {
			console.log(color.cyan('[INFO] ') + `正在傳送 ${commands.length} 個指令`);
			const data = await rest.put(
				Routes.applicationCommands(clientId),
				{ body: commands },
			);
			
			console.log(color.cyan('[INFO] ') + `已新增 ${data.length} 個data進discord`);

			const c = await rest.get(
				Routes.applicationCommands(clientId)
			);
			const table = new Table({
				head: ['名稱', '描述', '選項'],
				colWidths: [20, 30, 20],
				style: {
					head: [], 
					border: [], 
					compact: true
				},
			})
			c.forEach(command => {
				const options = command.options ? command.options.map(o => o.name).join(', ') : '無';
				table.push([command.name, command.description, options]);
			});
			console.log(table.toString());
		} catch (error) {
			console.error(error);
		}
	})();