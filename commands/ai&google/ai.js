const { EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const translate = require('@iamtraction/google-translate');

const colors = require('colors/safe')
const nowTime = require('../../run/time.js')

const apikey = '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'

module.exports = {
    data: require('../../command-src/ai.js'),
    async execute(interaction) {
        return await interaction.reply({ content: '其實這個指令的bug非常多! 所以開發者正在修復! 拭目以待吧!', ephemeral: true })
        const q = interaction.options.getString(`text`)
        try {
            await interaction.deferReply({ephemeral: true});
            const le = new EmbedBuilder()
                .setColor(0x661081)
                .setAuthor({ name: q, iconURL: interaction.user.displayAvatarURL() })
                .setDescription('<a:loading:1101100808231194664> 正在等待回覆...');

            let res
            let embed
            let prompt
            let openai
            let configuration

            switch (interaction.options.getSubcommand()) {
                case 'chatgpt':
                    configuration = new Configuration({
                        apiKey: apikey,
                    })
                    openai = new OpenAIApi(configuration);

                    await interaction.editReply({ embeds: [le], ephemeral: true})
                    prompt = `${q}`;

                    res = await openai.createCompletion({
                        model: 'text-davinci-003',
                        max_tokens: 1024,
                        temperature: 0.5,
                        prompt: prompt
                    })

                    let answer = res.data.choices[0].text
                    if (answer.length >= 1000) {
                        answer = answer.substring(1022) + '...'
                    }
                    embed = new EmbedBuilder()
                    .setColor(0x661081)
                    .setAuthor({ name: q, iconURL: interaction.user.displayAvatarURL() })
                    .addFields({ name: '<:Chat_2:1000094452167225364> | 回答:', value: `\`\`\`${answer}\`\`\`` , inline: true})
                    return await interaction.editReply({ embeds: [embed], ephemeral: false });
                case 'image':
                    configuration = new Configuration({
                        apiKey: apikey,
                    })
                    openai = new OpenAIApi(configuration)

                    await interaction.editReply({ embeds: [le], ephemeral: true})
                    res = await translate(q, { to: 'en' });
                    prompt = res.text;

                    const imgCreate = await openai.createImage({
                        prompt: `${prompt}`,
                        n: 1,
                        size: `1024x1024`,
                    });
                    const img = imgCreate.data.data[0].url;
                    embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setAuthor({ iconURL: interaction.user.avatarURL(), name: q })
                    .setImage(`${img}`)
                    .setTimestamp()
                    .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' });
                    return await interaction.editReply({ embeds: [embed], ephemeral: false });
                }
        } catch (error) {       
            const errEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('呃 我們這裡似乎出錯了...')
                .setDescription(`**錯誤:** \`${error}\``)
                .setTimestamp()
                .setFooter({ text: ' ‧ 蝦餃機器人', iconURL: 'https://i.imgur.com/BCmppEM.png' });
            await interaction.editReply({embeds: [errEmbed], ephemeral: true});

            console.log(colors.red('[OpenAI-ERROR]') + ` [${nowTime()}] ${error}`)
        }
    },
};
