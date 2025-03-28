import type { Api as RevealApi } from 'reveal.js';
import deepmerge from 'deepmerge';

export type RevealInstance = RevealApi;

/**
 * Options interface for advanced plugin configuration
 */
interface PluginOptions<TConfig extends object> {
    /** Unique identifier for the plugin */
    id: string;
    /** Plugin initialization function */
    init?: (plugin: PluginBase<TConfig>, deck: RevealInstance, config: TConfig) => void | Promise<void>;
    /** Default configuration object */
    defaultConfig?: TConfig;
}

/**
 * Base class for Reveal.js plugins providing standard functionality for
 * configuration management, initialization, and data sharing.
 */
export class PluginBase<TConfig extends object = Record<string, never>> {
    private readonly defaultConfig: TConfig;
    private readonly pluginInit?: (plugin: PluginBase<TConfig>, deck: RevealInstance, config: TConfig) => void | Promise<void>;
    public readonly pluginId: string;
    private mergedConfig: TConfig | null = null;

    /** Public data storage for plugin state */
    public data: Record<string, unknown> = {};

    /**
     * Create a new plugin instance
     * @param idOrOptions Plugin ID string or options object
     * @param init Optional initialization function
     * @param defaultConfig Optional default configuration
     */
    constructor(
        idOrOptions: string | PluginOptions<TConfig>,
        init?: (plugin: PluginBase<TConfig>, deck: RevealInstance, config: TConfig) => void | Promise<void>,
        defaultConfig?: TConfig
    ) {
        if (typeof idOrOptions === 'string') {
            this.pluginId = idOrOptions;
            this.pluginInit = init;
            this.defaultConfig = defaultConfig || {} as TConfig;
        } else {
            this.pluginId = idOrOptions.id;
            this.pluginInit = idOrOptions.init;
            this.defaultConfig = idOrOptions.defaultConfig || {} as TConfig;
        }
    }

    /**
     * Initialize plugin configuration by merging default and user settings
     */
    private initializeConfig(deck: RevealInstance): void {
        let baseConfig = this.defaultConfig;
        
        const revealConfig = deck.getConfig() as Record<string, unknown>;
        const userConfig = (revealConfig[this.pluginId] || {}) as Partial<TConfig>;
        
        this.mergedConfig = deepmerge(baseConfig, userConfig, {
            arrayMerge: (_, sourceArray) => sourceArray,
            clone: true
        });
    }

    /**
     * Get the current plugin configuration
     */
    public getCurrentConfig(): TConfig {
        if (!this.mergedConfig) {
            throw new Error('Plugin configuration has not been initialized');
        }
        return this.mergedConfig;
    }

    /**
     * Get plugin data if any exists
     */
    public getData(): Record<string, unknown> | undefined {
        return Object.keys(this.data).length > 0 ? this.data : undefined;
    }

    /**
     * Initialize the plugin
     */
    public init(deck: RevealInstance): void | Promise<void> {
        this.initializeConfig(deck);

        if (this.pluginInit) {
            return this.pluginInit(this, deck, this.getCurrentConfig());
        }
    }

    /**
     * Create the plugin interface containing all exports
     */
    public createInterface(additionalExports: Record<string, unknown> = {}) {
        const exports: Record<string, unknown> = {
            id: this.pluginId,
            init: (deck: RevealInstance) => this.init(deck),
            getConfig: () => this.getCurrentConfig(),
            getData: () => this.getData(),
            ...additionalExports
        };

        return exports;
    }
}

/* Plugin authors' guide:

The 'main' parameter (shown in the examples below) is where you pass your plugin's main function. 
This is the core of your plugin where you implement its primary functionality. You can name this 
function anything in your code (like 'main', 'setup', 'initialize', etc.), but it should handle 
your plugin's main logic.

This function receives:
- plugin: Access to the plugin instance and its utilities
- deck: The Reveal.js deck instance
- config: Your plugin's merged configuration

// main.ts - Contains your plugin's main functionality

import type { Api } from 'reveal.js';
import type { Config } from './config';
import type { PluginBase } from './lib/reveal-plugin-base'; // or from npm package

// You may use async functions if needed
export const main = async (plugin: PluginBase<Config>, deck: Api, config: Config): Promise<void> => {
    // Your plugin's main logic here
};


1. Basic plugin without configuration:
```typescript
export default () => {
    const plugin = new PluginBase('myplugin', main);
    return plugin.createInterface();
};
```

2. Plugin with configuration and an example of a function that may be called by other plugins or the main script.
```typescript
export default () => {
    const plugin = new PluginBase('myplugin', main, defaultConfig);
    return plugin.createInterface({
        someMethod: () => {
            // Custom functionality
        }
    });
};
```

3. Plugin with exposed functionality:
```typescript
// main.ts
export const main = async (plugin: PluginBase<Config>, deck: RevealInstance, config: Config) => {
    // Set up your elements
    const elements = document.querySelectorAll('.special-elements');
    plugin.data.elements = elements;
    
    // Function that other plugins might want to use
    const refreshElements = () => {
        plugin.data.elements = document.querySelectorAll('.special-elements');
        return plugin.data.elements;
    };

    // Store function for external access
    plugin.data.refreshFunction = refreshElements;
};

// index.ts
export default () => {
    const plugin = new PluginBase('myplugin', main);
    
    return plugin.createInterface({
        // Expose the refresh function to other plugins
        refreshElements: () => {
            const refresh = plugin.data.refreshFunction as () => NodeList;
            return refresh();
        },
        // Expose element count
        getElementCount: () => {
            return (plugin.data.elements as NodeList)?.length || 0;
        }
    });
};

// Usage from another plugin:
const myPlugin = deck.getPlugin('myplugin');
if (myPlugin) {
    const count = myPlugin.getElementCount();
    const refreshed = myPlugin.refreshElements();
}
```




*/