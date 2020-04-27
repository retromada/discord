const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'skip',
  aliases: ['next'],
  description: 'Skip to the next track',
  category: 'music',
  execute(message) {
    const { channel } = message.member.voice

    if (!channel) return message.channel.send(new MessageEmbed()
      .setColor([255, 0, 0])
      .setDescription('Go to a voice channel!')
    )

    const queue = message.client.queue.get(message.guild.id)
    queue.connection.dispatcher.end()
  }
}