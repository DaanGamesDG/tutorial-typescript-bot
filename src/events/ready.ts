import { Listener } from "discord-akairo";

export default class ready extends Listener {
	constructor() {
		super("ready", {
			emitter: "client",
			event: "ready",
			category: "client",
		});
	}

	exec(): void {
		console.log(`${this.client.user?.tag} has logged in!`);
		this.client.user?.setActivity("ready for testing", { type: "PLAYING" });
	}
}
