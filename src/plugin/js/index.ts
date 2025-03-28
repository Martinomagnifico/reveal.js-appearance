import { defaultConfig } from './config'
import { PluginBase } from './lib/reveal-plugin-base';
import { main } from './main';

export default () => {
    const plugin = new PluginBase('appearance', main, defaultConfig);
    return plugin.createInterface();
};