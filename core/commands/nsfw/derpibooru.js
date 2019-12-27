const { RandomBooruPost } = require('../../');

module.exports = {
  name: 'derpibooru',
  aliases: ['dp', 'derp', 'derpi'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Searches for images on derpibooru.org',
  usage: '[search query]',
  category: 'nsfw',
  guildOnly: false,
  params: true,
  cooldown: 10,
  enabled: true,
  async execute(client, message, params) {
    await RandomBooruPost(client, message, params, this);
  }
};