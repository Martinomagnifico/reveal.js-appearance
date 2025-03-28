import type { Api } from 'reveal.js';
import type { Config } from './config';
import type { PluginBase } from './lib/reveal-plugin-base';
import { loadPluginCSS } from './lib/reveal-plugin-cssloader';
import { debug } from "./helpers";

import { Appearance } from './core';
import '../css/index.scss'

export const main = async (plugin: PluginBase<Config>, deck: Api, config: Config): Promise<void> => {

	if (debug && (config.debug || (deck.getConfig() as any).debug)) {
		debug.initialize(true, "Appearance");
	}

	const generatorMetaTag = document.querySelector("[name=generator]");
	let isQuartoContent = false;
	if (generatorMetaTag instanceof HTMLMetaElement) {
		isQuartoContent = generatorMetaTag.content.includes("quarto");
	}
	
	if (!isQuartoContent) {
		try {
			await loadPluginCSS(
				plugin.pluginId,
				`reveal.js-${plugin.pluginId}`,
				config.cssautoload,
				config.csspath,
				config.debug
			);
		} catch (err) {
			if (config.debug) { console.warn(`CSS loading failed but plugin will continue:`, err) }
			// Continue with plugin initialization despite CSS failure
		}
	}

	await Appearance.create(deck, config);

};