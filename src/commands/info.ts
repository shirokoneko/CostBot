import { botOwner, repository } from "../botconfig";
import { clientStats, ClientStatOptions, version } from "../utils/misc";
import { Message, Client, User } from "discord.js";

export default {
	name: 'info',
	description: 'Displays information about the bot.',
	aliases: ['information', 'about'],
	permissions: ['EMBED_LINKS'],
	cooldown: 5,
	do: async (message: Message, client: Client, args: string[], Discord: typeof import('discord.js')) => {
		const developer: User = await client.users.cache.get(botOwner);

		const embed = new Discord.MessageEmbed()
			.setColor('#6293f5')
			.setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
			.setTitle(`${client.user.username} Information`)
			.addFields(
				{ name: 'Developer', value: `${developer.tag} (${developer.id})` },
				{ name: 'Version', value: await version(), inline: true },
				{ name: 'Library', value: `discord.js v${Discord.version}`, inline: true },
				{ name: 'Number of commands', value: client.commands.size, inline: true },
				{ name: 'GitHub Repository', value: repository, inline: true },
				{ name: '\u200B', value: '\u200B' },
			)
			.setTimestamp();
		const options: ClientStatOptions = {
			noUptimeInline: true,
		};
		clientStats(embed, client, options);
		message.channel.send(embed);
	},
};