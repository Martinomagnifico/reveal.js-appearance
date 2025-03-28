import type { Api } from 'reveal.js';
import type { Config } from './config';
import { debug } from "./helpers";

import { PluginBase, pluginCSS } from 'reveal.js-plugintoolkit';

import { defaultConfig } from './config'
import { Appearance } from './main';

import '../css/index.scss'

const init = async (plugin: PluginBase<Config>, deck: Api, config: Config): Promise<void> => {


    if (debug && (config.debug || (deck.getConfig() as any).debug)) {
        debug.initialize(true, "Appearance");
    }

    const generatorMetaTag = document.querySelector("meta[name=generator]");
    const isQuartoContent = generatorMetaTag instanceof HTMLMetaElement && generatorMetaTag.content.includes("quarto");

    if (!isQuartoContent && config.cssautoload) {
        try {
            await pluginCSS({
                id: plugin.pluginId,
                enableLoading: config.cssautoload,
                userPath: config.csspath,
                debug: config.debug
            });
        } catch (err) {
            console.warn('CSS loading failed, but plugin will continue:', err);
        }
    }
	await Appearance.create(deck, config);

}

export default () => {
    const plugin = new PluginBase('appearance', init, defaultConfig);
    return plugin.createInterface();
};