const { DiscordUtils } = require('../../')

module.exports = {
  name: 'kick',
  description: 'User expulsion management',
  usage: '[user] <reason>',
  category: 'moderation',
  requirements: { parameters: true, permissions: ['KICK_MEMBERS'] },
  async execute(message) {
  	const member = await message.client.users.fetch(DiscordUtils.resolveUser(message))
  	const reason = message.parameters.slice(1).join(' ')

  	member.kick({ reason })
  		.then((member) => message.channel.send(`${member.user.tag} was banned.\nReason: ${reason ? reason : 'None'}`))
  		.catch((error) => message.channel.send(error.message, { code: 'fix' }))
  }
}