const { DiscordUtils } = require('../../')

module.exports = {
  name: 'softban',
  aliases: [],
  description: 'User softban management',
  usage: '[user] <reason>',
  category: 'moderation',
  requirements: { parameters: true, permissions: ['BAN_MEMBERS'] },
  async execute(message) {
    try {
      const reason = message.parameters.slice(1).join(' ')
      const member = await message.guild.members.fetch(DiscordUtils.resolveUser(message))

      if (!member || member.id === message.author.id || member.id === message.client.user.id) return

      member.ban({ reason: `(Issued by ${message.author.tag})${reason ? ` ${reason}` : ''}` })
        .then((banned) => {
          message.guild.members.unban(banned.user)
            .then((user) => message.channel.send(`${!user.bot ? 'User' : 'Bot'} **${user.tag}** was softbanned. Reason: \`${reason ? reason : 'None'}\``))
        })
        .catch((error) => message.channel.send(error.message, { code: 'fix' }))
    } catch (error) {
      message.channel.send(error.message, { code: 'fix' })
    }
  }
}