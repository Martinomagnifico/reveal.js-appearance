
/**
 * Load CSS for a plugin, handling both development and production environments
 * @param pluginId The ID of the plugin (e.g., "simplemenu")
 * @param packageName The NPM package name (e.g., "reveal.js-simplemenu")
 * @param cssautoload Whether to automatically load CSS
 * @param csspath Optional custom CSS path
 * @param debug Whether to enable debug logging
 */

export const loadPluginCSS = async (
    pluginId: string,
    packageName: string,
    cssautoload: boolean = true,
    csspath?: string | false,
    debug: boolean = false
): Promise<void> => {
    // Handle different ways users might disable CSS loading
    if (cssautoload === false || csspath === false) {
        return;
    }
    
    // Check if already loaded
    if (document.querySelector(`[data-css-id="${pluginId}"]`)) {
        if (debug) console.log(`CSS for ${pluginId} already loaded, skipping`);
        return;
    }

    // Determine environment
    const isModuleEnv = typeof import.meta !== 'undefined';
    const isDevEnv = isModuleEnv && typeof import.meta.env?.DEV !== 'undefined' && import.meta.env.DEV;
    
    // If a custom path is provided, use that exclusively, even in development mode
    if (csspath) {
        try {
            if (debug) console.log(`Using custom CSS path: ${csspath}`);
            await linkAndLoad(pluginId, csspath, debug);
            return;
        } catch (error) {
            // Single warning instead of multiple logs
            console.warn(`Failed to load CSS from user-specified path: ${csspath}. Make sure the path is correct or remove the csspath option to use automatic path detection.`);
            throw error; // Re-throw to indicate failure
        }
    }
    
    // In development mode with no custom path, the import at the top of the file handles CSS
    if (isDevEnv) {
        // Create marker element
        const marker = document.createElement('style');
        marker.setAttribute('data-css-id', pluginId);
        marker.textContent = '/* CSS loaded via import */';
        document.head.appendChild(marker);
        
        if (debug) console.log(`Development CSS handled via import`);
        return;
    }
    
    // Try to detect the best path for the CSS (for production with no custom path)
    const possiblePaths = detectPossiblePaths(pluginId, packageName);
    
    // Try each path in order
    for (const path of possiblePaths) {
        try {
            if (debug) console.log(`Trying to load CSS from: ${path}`);
            await linkAndLoad(pluginId, path, debug);
            return; // Success - exit function
        } catch (error) {
            if (debug) console.log(`Failed to load CSS from: ${path}`);
            // Continue to next path
        }
    }
    
    // If we get here, all paths failed
    console.warn(`Could not load CSS for ${pluginId} from any location. You may need to specify the path using a csspath parameter.`);
};

/**
 * Helper function to detect possible CSS paths for a plugin
 */

const detectPossiblePaths = (pluginId: string, packageName: string): string[] => {
	const paths: string[] = [];
	
	// 1. Try to detect from script tags
	const scriptPath = detectScriptPath(pluginId, packageName);
	if (scriptPath) {
		paths.push(`${scriptPath}${pluginId}.css`);
		paths.push(`${scriptPath}${pluginId}.min.css`);
	}
	
	// 2. Check for npm/node_modules paths
	paths.push(`node_modules/reveal.js-${pluginId}/plugin/${pluginId}/${pluginId}.css`);
	paths.push(`node_modules/reveal.js-${pluginId}/dist/${pluginId}.css`);
	
	// 3. Standard reveal.js plugin paths
	paths.push(`plugin/${pluginId}/${pluginId}.css`);
	paths.push(`plugins/${pluginId}/${pluginId}.css`);
	paths.push(`dist/plugin/${pluginId}/${pluginId}.css`);
	
	// 4. Try import.meta.url path if available
	try {
		if (typeof import.meta !== 'undefined' && import.meta.url) {
			const metaPath = import.meta.url.slice(0, import.meta.url.lastIndexOf('/') + 1);
			paths.push(`${metaPath}${pluginId}.css`);
		}
	} catch (e) {
		// import.meta.url not available
	}
	
	return paths;
}

/**
 * Helper function to detect the script path
 */
const detectScriptPath = (pluginId: string, packageName: string): string | null => {
	// Look for script tags with the plugin name
	const scriptPatterns = [
		`${pluginId}.js`,
		`${pluginId}.min.js`,
		`${packageName}.js`,
		`${packageName}.min.js`
	];
	
	for (const pattern of scriptPatterns) {
		const script = document.querySelector(`script[src*="${pattern}"]`) as HTMLScriptElement | null;
		if (script && script.src) {
			const src = script.getAttribute("src") || '';
			const lastIndex = src.lastIndexOf(pattern);
			if (lastIndex !== -1) {
				return src.substring(0, lastIndex);
			}
		}
	}
	
	return null;
}


/**
 * Helper function to load a CSS file via link element
 */
const linkAndLoad = (pluginId: string, path: string, debug: boolean = false): Promise<void> => {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;
        link.setAttribute('data-css-id', pluginId);
        
        // Set a timeout in case the link never triggers onload or onerror
        const timeout = setTimeout(() => {
            if (debug) console.log(`Timeout loading CSS from: ${path}`);
            reject(new Error(`Timeout loading CSS from: ${path}`));
        }, 5000); // 5 second timeout
        
        // Success handler
        link.onload = () => {
            clearTimeout(timeout);
            if (debug) console.log(`CSS loaded from: ${path}`);
            resolve();
        };
        
        // Error handler - create Error but don't log here
        link.onerror = () => {
            clearTimeout(timeout);
            reject(new Error(`Failed to load CSS from: ${path}`));
        };
        
        document.head.appendChild(link);
    });
};