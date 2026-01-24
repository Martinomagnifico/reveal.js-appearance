import "../css/index.scss";

// Basic imports
import type { Api } from "reveal.js";
// Helper imports
import { pluginDebug as debug, PluginBase, pluginCSS } from "reveal.js-plugintoolkit";
import type { Config } from "./config";
import { defaultConfig } from "./config";

// Function imports
import { Appearance } from "./main";

const PLUGIN_ID = "appearance";

const init = async (plugin: PluginBase<Config>, deck: Api, config: Config): Promise<void> => {
	// Init debug
	if (debug && config.debug) {
		debug.initialize(true, PLUGIN_ID);
	}

	await pluginCSS(plugin, config);
	await Appearance.create(deck, config);
};

export default () => {
	const plugin = new PluginBase(PLUGIN_ID, init, defaultConfig);
	return plugin.createInterface();
};
