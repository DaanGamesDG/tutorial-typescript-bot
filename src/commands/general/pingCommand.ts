import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class ping extends Command {
	constructor() {
		super("ping", {
			aliases: ["ping", "pong"],
			description: {
				content: "Shows you the api latency",
				usage: "ping",
				examples: ["ping"],
			},
			category: "general",
		});
	}

	async exec(message: Message): Promise<void> {
		const time = Date.now();
		const msg = await message.util?.send(`>>> 🏓 | Pinging...`);
		msg?.edit(
			`>>> 🏓 | Pong! Edit Latency: \`${Date.now() - time}\`ms, API Latency: \`${
				this.client.ws.ping
			}\`ms.`
		);
	}
}
