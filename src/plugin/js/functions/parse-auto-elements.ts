import { pluginDebug as debug } from "reveal.js-plugintoolkit";
import type { AnimationOption } from "../config";
import { toJSONString } from "../helpers";

/**
 * Decode HTML entities
 */
const decodeHtmlEntities = (str: string): string => {
	const textarea = document.createElement("textarea");
	textarea.innerHTML = str;
	return textarea.value;
};

/**
 * Normalize curly quotes to straight quotes (for Quarto compatibility)
 */
const normalizeQuotes = (str: string): string => {
	return str
		.replace(/[\u2018\u2019]/g, "'")  // ' and ' to '
		.replace(/[\u201C\u201D]/g, '"'); // " and " to "
};

/**
 * Parse autoelements configuration from various sources
 * Handles strings, objects, and normalizes quotes for Quarto compatibility
 * 
 * @param input The input to parse (string, object, boolean, or null)
 * @param isFromAttribute Whether this input comes from a data attribute (triggers quote normalization)
 * @returns Parsed autoelements object or null
 */
export const parseAutoElements = (
	input: string | Record<string, AnimationOption> | boolean | null,
	isFromAttribute: boolean = false
): Record<string, AnimationOption> | null => {
	if (!input) return null;
	
	// If it's already an object, return it
	if (typeof input === "object" && input !== null && !Array.isArray(input)) {
		return input;
	}
	
	// If it's a boolean, return null (invalid)
	if (typeof input === "boolean") {
		return null;
	}
	
	// If it's a string, parse it
	if (typeof input === "string") {
		try {
			// For attributes, decode HTML entities and normalize quotes
			let processedString = input;
			if (isFromAttribute) {
				processedString = normalizeQuotes(decodeHtmlEntities(input));
			}
			
			return JSON.parse(toJSONString(processedString));
		} catch (e) {
			debug.log(`Error parsing autoelements: ${e} (${input})`);
			return null;
		}
	}
	
	return null;
};