/**
 * Constants for the Appearance
 */
export interface AppearanceConsts {
	baseclass: string;
	compatibilitybaseclass: string;
	fragmentSelector: string;
	fragmentClass: string;
	speedClasses: string[];
	animatecss: string;
	eventnames: string[];
}

/**
 * Initialize plugin constants
 */
export function initConsts(
	baseclass: string,
	compatibilitybaseclass: string,
	compatibility: boolean
): AppearanceConsts {
	// Create base constants
	const consts: AppearanceConsts = {
		baseclass,
		compatibilitybaseclass,
		fragmentSelector: ".fragment",
		fragmentClass: "fragment",
		speedClasses: ["slower", "slow", "fast", "faster"],
		animatecss: '[class^="animate__"],[class*=" animate__"]',
		eventnames: [
			"ready",
			"slidechanged",
			"slidetransitionend",
			"autoanimate",
			"overviewhidden",
		],
	};

	// Add animate__ prefixed versions of speed classes
	consts.speedClasses = [
		...consts.speedClasses,
		...consts.speedClasses.map((speed) => `animate__${speed}`),
	];

	// Handle compatibility mode
	if (compatibility) {
		consts.animatecss =
			".backInDown, .backInLeft, .backInRight, .backInUp, .bounceIn, .bounceInDown, .bounceInLeft, .bounceInRight, .bounceInUp, .fadeIn, .fadeInDown, .fadeInDownBig, .fadeInLeft, .fadeInLeftBig, .fadeInRight, .fadeInRightBig, .fadeInUp, .fadeInUpBig, .fadeInTopLeft, .fadeInTopRight, .fadeInBottomLeft, .fadeInBottomRight, .flipInX, .flipInY, .lightSpeedInRight, .lightSpeedInLeft, .rotateIn, .rotateInDownLeft, .rotateInDownRight, .rotateInUpLeft, .rotateInUpRight, .jackInTheBox, .rollIn, .zoomIn, .zoomInDown, .zoomInLeft, .zoomInRight, .zoomInUp, .slideInDown, .slideInLeft, .slideInRight, .slideInUp, .skidLeft, .skidLeftBig, .skidRight, .skidRightBig, .shrinkIn, .shrinkInBlur";
		consts.baseclass = compatibilitybaseclass;
	}
	return consts;
}
