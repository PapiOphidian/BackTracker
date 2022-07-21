const { BackTracker } = require("../");

const errors = [
	"SyntaxError: Unexpected token '?'\n\
		at wrapSafe (internal/modules/cjs/loader.js:1070:16)\n\
		at Module._compile (internal/modules/cjs/loader.js:1120:27)\n\
		at Object.Module._extensions..js (internal/modules/cjs/loader.js:1176:10)\n\
		at Module.load (internal/modules/cjs/loader.js:1000:32)\n\
		at Function.Module._load (internal/modules/cjs/loader.js:899:14)\n\
		at Module.require (internal/modules/cjs/loader.js:1042:19)\n\
		at require (internal/modules/cjs/helpers.js:77:18)\n\
		at Object.<anonymous> (C:\\Users\\hugo\\Documents\\Loisir\\Dev\\Discord_Bots\\Aura-discord\\bot\\node_modules\\discord.js\\src\\client\\BaseClient.js:4:21)\n\
		at Module._compile (internal/modules/cjs/loader.js:1156:30)\n\
		at Object.Module._extensions..js (internal/modules/cjs/loader.js:1176:10)",

	"TypeError [CLIENT_MISSING_INTENTS]: Valid intents must be provided for the Client.\n\
		at Client._validateOptions (C:\\Users\\hugo\\Documents\\Loisir\\Dev\\Discord_Bots\\Aura-discord\\bot\\node_modules\\discord.js\\src\\client\\Client.js:544:13)\n\
		at new Client (C:\\Users\\hugo\\Documents\\Loisir\\Dev\\Discord_Bots\\Aura-discord\\bot\\node_modules\\discord.js\\src\\client\\Client.js:73:10)\n\
		at Object.<anonymous> (C:\\Users\\hugo\\Documents\\Loisir\\Dev\\Discord_Bots\\Aura-discord\\bot\\src\\index.js:5:16)\n\
		at Module._compile (node:internal/modules/cjs/loader:1101:14)\n\
		at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)\n\
		at Module.load (node:internal/modules/cjs/loader:981:32)\n\
		at Function.Module._load (node:internal/modules/cjs/loader:822:12)\n\
		at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:79:12)\n\
		at node:internal/main/run_main_module:17:47",

		"TypeError: Cannot convert undefined or null to object\n\
			at Function.values (<anonymous>)\n\
			at C:\\Users\\bekfe\\OneDrive\\Documents\\Aspectfully\\code\\commands\\wikipedia.js:36:42\n\
			at processTicksAndRejections (node:internal/process/task_queues:96:5)",

		"SyntaxError: Unexpected end of input\n\
			at Object.compileFunction (node:vm:352:18)\n\
			at wrapSafe (node:internal/modules/cjs/loader:1025:15)\n\
			at Module._compile (node:internal/modules/cjs/loader:1059:27)\n\
			at Object.Module._extensions..js (node:internal/modules/cjs/loader:1124:10)\n\
			at Module.load (node:internal/modules/cjs/loader:975:32)\n\
			at Function.Module._load (node:internal/modules/cjs/loader:816:12)\n\
			at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:79:12)\n\
			at node:internal/main/run_main_module:17:47",

		"Error: Cannot find module 'C:\\Users\\username\\OneDrive\\Desktop\\Bots\\JSBot\\main.js'\n\
			at Function.Module._resolveFilename (node:internal/modules/cjs/loader:933:15)\n\
			at Function.Module._load (node:internal/modules/cjs/loader:778:27)\n\
			at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)\n\
			at node:internal/main/run_main_module:17:47",

		"Error: ENOENT: no such file or directory, scandir './commands'\n\
			at Object.readdirSync (node:fs:1390:3)\n\
			at Client.<anonymous> (C:\\Users\\name\Desktop\\Logic RP Discord Bot\\src\\index.js:21:29)\n\
			at Object.onceWrapper (node:events:510:26)\n\
			at Client.emit (node:events:390:28)\n\
			at WebSocketManager.triggerClientReady (C:\\Users\\name\Desktop\\Logic RP Discord Bot\\node_modules\\discord.js\\src\\client\\websocket\\WebSocketManager.js:383:17)\n\
			at WebSocketManager.checkShardsReady (C:\\Users\\name\\Desktop\\Logic RP Discord Bot\\node_modules\\discord.js\\src\\client\\websocket\\WebSocketManager.js:366:10)\n\
			at WebSocketShard.<anonymous> (C:\\Users\\name\\Desktop\\Logic RP Discord Bot\\node_modules\\discord.js\\src\\client\\websocket\\WebSocketManager.js:188:14)\n\
			at WebSocketShard.emit (node:events:390:28)\n\
			at WebSocketShard.checkReady (C:\\Users\\name\\Desktop\\Logic RP Discord Bot\\node_modules\\discord.js\\src\client\\websocket\\WebSocketShard.js:474:12)\n\
			at WebSocketShard.onPacket (C:\\Users\\name\\Desktop\\Logic RP Discord Bot\\node_modules\\discord.js\\src\\client\\websocket\\WebSocketShard.js:446:16)",

		"Error\n\
			at RequestHandler.request (/root/Amanda/node_modules/snowtransfer/dist/RequestHandler.js:83:23)\n\
			at UserMethods.getUser (/root/Amanda/node_modules/snowtransfer/dist/methods/Users.js:34:36)\n\
			at Amanda.fetchUser (/root/Amanda/node_modules/thunderstorm/src/client/Client.js:36:44)\n\
			at eval (eval at process (/root/Amanda/commands/admin.js:61:15), <anonymous>:1:8)\n\
			at Object.process (/root/Amanda/commands/admin.js:61:15)\n\
			at runMicrotasks (<anonymous>)\n\
			at processTicksAndRejections (node:internal/process/task_queues:96:5)\n\
			at async Amanda.manageMessage (/root/Amanda/modules/events.js:164:4)",

		"Error: value too long for type character(1)\n\
			at Parser.parseErrorMessage (/root/Amanda/node_modules/pg-protocol/dist/parser.js:287:98)\n\
			at Parser.handlePacket (/root/Amanda/node_modules/pg-protocol/dist/parser.js:126:29)\n\
			at Parser.parse (/root/Amanda/node_modules/pg-protocol/dist/parser.js:39:38)\n\
			at Socket.<anonymous> (/root/Amanda/node_modules/pg-protocol/dist/index.js:11:42)\n\
			at Socket.emit (node:events:394:28)\n\
			at Socket.emit (node:domain:475:12)\n\
			at addChunk (node:internal/streams/readable:312:12)\n\
			at readableAddChunk (node:internal/streams/readable:287:9)\n\
			at Socket.Readable.push (node:internal/streams/readable:226:10)\n\
			at TCP.onStreamRead (node:internal/stream_base_commons:190:23)",

		"Error\n\
			at RequestHandler.request (/root/Amanda/node_modules/snowtransfer/dist/RequestHandler.js:83:23)\n\
			at InteractionMethods.createInteractionResponse (/root/Amanda/node_modules/snowtransfer/dist/methods/Interactions.js:154:36)\n\
			at CommandInteraction.defer (/root/Amanda/node_modules/thunderstorm/src/structures/interfaces/InteractionResponses.js:13:45)\n\
			at Object.process (/root/Amanda/dist/commands/interaction.js:41:23)\n\
			at Amanda.<anonymous> (/root/Amanda/dist/modules/EventManager.js:110:64)\n\
			at Amanda.emit (node:events:394:28)\n\
			at Amanda.emit (node:domain:475:12)\n\
			at InteractionCreateAction.handle (/root/Amanda/node_modules/thunderstorm/src/client/actions/InteractionCreate.js:55:16)\n\
			at handle (/root/Amanda/node_modules/thunderstorm/src/handle.js:97:42)\n\
			at Worker.<anonymous> (/root/Amanda/dist/index.js:61:42)",

		"TypeError: Cannot read property 'id' of null\n\
			at Object.User (/app/node_modules/discord.js/src/util/Constants.js:109:16)\n\
			at RESTMethods.getUser (/app/node_modules/discord.js/src/client/rest/RESTMethods.js:381:51)\n\
			at Client.fetchUser (/app/node_modules/discord.js/src/client/Client.js:317:30)\n\
			at getWaifuInfo (/app/commands/interaction.js:19:36)\n\
			at <anonymous>\n\
			at process._tickCallback (internal/process/next_tick.js:188:7)"
];

for (const error of errors) {
	const split = error.split("\n")
	const frames = split.slice(1).map(i => i.trim());

	const result = BackTracker.process(frames, false);
	if (result.length !== frames.length) {
		console.log(`${frames.length - result.length} frames did not match output.`);
		console.log(frames, result);
	} else console.log(`All frames matched for ${split[0]}`);
}
