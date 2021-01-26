import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";
import { Message } from "discord.js";

export default class help extends Command {
	constructor() {
		super("help", {
			aliases: ["help", "commands", "cmd"],
			clientPermissions: ["EMBED_LINKS"],
			category: "general",
			description: {
				content: "Shows you all available commands or more information about a specific one.",
				usage: "help [command name]",
				examples: ["help", "help ping"],
			},
			args: [
				{
					id: "command",
					type: "command",
				},
			],
		});
	}

	exec(message: Message, { command }: { command: Command }): void {
		const embed = new MessageEmbed()
			.setColor(message.member?.displayColor || "#37625d")
			.setTitle(`Help Command | ${message.author.tag}`)
			.setThumbnail(
				message.guild?.iconURL({ dynamic: true, size: 4096 }) ||
					message.author.displayAvatarURL({ dynamic: true, size: 4096 })
			)
			.setFooter(
				`❗ | The prefix for ${this.client.user.tag} is "${this.client.commandHandler.prefix}" - <> = required, [] = optional`
			);

		if (command) {
			embed.setDescription([
				`>>> 🏷 | **Command Name**: ${command.id}`,
				`🔖 | **Aliases**: \`${command.aliases.slice(1).join("`, `")}\`\n`,
				`📋 | **Description**: ${command.description.content}`,
				`❓ | **Usage**: ${command.description.usage}`,
				`💡 | **Examples**: \`${command.description.examples.join("`, `")}\`\n`,
				`💻 | **Owner Only**: \`${command.ownerOnly ? "yes" : "no"}\``,
			]);
		} else {
			const categories = this.client.commandHandler.categories.values();
			for (const category of categories) {
				const owner = this.client.isOwner(message.author);
				if (["ownerOnly"].includes(category.id) && !owner) continue;

				const cmds = (owner
					? category.filter((c) => c.aliases.length > 0)
					: category.filter((c) => c.aliases.length > 0 && !c.ownerOnly)
				)
					.map((c) => `\`${c.id}\``)
					.join(", ");

				embed.addField(`• ${category.id}`, cmds);
			}
		}

		message.util.send(embed);
	}
}
