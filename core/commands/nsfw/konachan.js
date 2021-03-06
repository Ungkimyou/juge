const { RandomBooruPost } = require('../../');

module.exports = {
  name: 'konachan',
  aliases: ['kc', 'konac', 'kcom'],
  description: 'Searches for images on konachan.com',
  usage: '[search query]',
  category: 'nsfw',
  requirements: { nsfwOnly: true, parameters: true, botPermissions: ['EMBED_LINKS'] },
  cooldown: 10,
  async execute(client, message) {
    await RandomBooruPost(client, message, this);
  }
};
