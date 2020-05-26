module.exports = [
	/at eval \(eval at ([\w_.<>]*) \(([^*?"<>]*):(\d+):(\d+)\),? ?(?:[^:]+:\d+:\d+)?\)/, // expression for global.eval
	/at (async)? ?([\w_.<>]+)? \(([^*?"<>]*):(\d+):(\d+)\)/, // expression for named scopes
	/at (.[\w_.<>]*)? ?\((<anonymous>)\)/, // expression for anonymous scopes
	/at ([^*?"<>]*):(\d+):(\d+)/, // expression for scopes not named
	/((?:.[\w_.<>]*)? ?(?:.[\w_.<>]*)? ?\[(?:as)? ?(?:.[\w_.<>]*)\])? ?\(([^*?"<>]*):(\d+):(\d+)\)/ // expression for something??? I'm not sure what to call it tbh.
];
