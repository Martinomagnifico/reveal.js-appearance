import { loadStyle } from '../helpers';
import { pluginPath } from '../helpers';

/**
 * Retrieves and loads CSS stylesheets based on the provided options and ES5 filename.
 *
 * @param {Object} options - Configuration options for loading CSS.
 * @param {string} fileName - The filename of the script.
 */

export const getAndLoadCSS = (options, fileName) => {
	let thePath = pluginPath(fileName);
	let pluginBaseName = fileName.replace(/\.[^/.]+$/, "");

	let AppearanceStylePath = options.csspath.appearance ? options.csspath.appearance : null || `${thePath}${pluginBaseName}.css` || `plugin/${pluginBaseName}/${pluginBaseName}.css`
	let AnimateCSSPath = !options.compatibility ? options.animatecsspath.link : options.animatecsspath.compat;

	if (options.debug) {
		console.log(`Paths:`);
		console.log(`  - Plugin path = ${thePath}`);
		console.log(`  - Appearance CSS path = ${AppearanceStylePath}`);
		console.log(`  - AnimateCSS CSS path = ${AnimateCSSPath}`);
	}

	loadStyle(AnimateCSSPath, function () {
		loadStyle(AppearanceStylePath);
	});

}