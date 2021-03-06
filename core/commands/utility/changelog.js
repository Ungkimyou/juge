const GitHub = require('../../apis/GitHub.js');
const { JUGE_REPO_USERNAME, JUGE_REPO_NAME } = process.env;

module.exports = {
  name: 'changelog',
  aliases: ['updates', 'commits'],
  description: 'Latest commits to bot repository',
  usage: '<branch>',
  category: 'utility',
  requirements: { botPermissions: ['EMBED_LINKS'] },
  cooldown: 60,
  async execute(client, message) {
    const [ branchName ] = message.parameters;
    const branches = await GitHub.getRepository(JUGE_REPO_USERNAME, JUGE_REPO_NAME, 'branches');
    let branch = branches.filter((branch) => branchName && branch.name === branchName.toLowerCase());

    branch = !branch.length
    ? branches.filter((branch) => branch.name === 'stable')[0]
    : branch[0]

    const commits = (await GitHub.getRepository(JUGE_REPO_USERNAME, JUGE_REPO_NAME, `commits?sha=${branch.commit.sha}&per_page=NEED_THIS`)).slice(0, 10);

    message.channel.send(new client.MessageEmbed()
      .setColor(client.utils.hexColor(message))
      .setTitle(`:twisted_rightwards_arrows: ${JUGE_REPO_NAME}:${branch.name}`)
      .setURL(`https://github.com/${JUGE_REPO_USERNAME}/${JUGE_REPO_NAME}/commits/${branch.name}`)
      .addFields(commits.map(({ sha, commit, html_url, committer }) => ({
        name: sha.slice(0, 7),
        value: [
          `[\`${commit.message}\`](${html_url}) (${client.utils.days(commit.committer.date, { extended: false }) > 0 ? `${client.utils.days(commit.committer.date)} ago` : 'Today'})`,
          `**Committer**: [${committer.login}](${committer.html_url})`
        ].join('\n')
      })))
    );
  }
};
