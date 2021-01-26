import { ListenerHandler } from "discord-akairo";
import { CommandHandler } from "discord-akairo";
import { AkairoClient } from "discord-akairo";
import { join } from "path";

declare module "discord-akairo" {
	interface AkairoClient {
		commandHandler: CommandHandler;
		listenerHandler: ListenerHandler;
	}
}
export default class osloClient extends AkairoClient {
	public constructor({ owners }: { owners: string[] }) {
		super({
			ownerID: owners,
		});
	}

	public commandHandler: CommandHandler = new CommandHandler(this, {
		directory: join(__dirname, "..", "commands"),
		prefix: process.env.PREFIX,
		commandUtil: true,
		handleEdits: true,
		commandUtilLifetime: 6e5,
		ignoreCooldown: this.ownerID,
		ignorePermissions: this.ownerID,
		allowMention: true,
	});

	public listenerHandler: ListenerHandler = new ListenerHandler(this, {
		directory: join(__dirname, "..", "events"),
	});

	public async start(): Promise<string> {
		this._init();
		return this.login(process.env.TOKEN);
	}

	private _init(): void {
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
			process,
		});

		[this.commandHandler, this.listenerHandler].forEach((x) => x.loadAll());
	}
}
