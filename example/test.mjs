import { getStack } from "../dist/index.js";
import util from "util";

function epic() {
	console.log("Okay. This is epic.");
	console.log(util.inspect(getStack().first(), true, 100, true));
}

export default epic;
