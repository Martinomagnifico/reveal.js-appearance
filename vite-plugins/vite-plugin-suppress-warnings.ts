// Vite can be annoying with warnings when something is being built for a non-module environment, hence this Vite plugin.

export default function suppressWarnings() {
	let originalWarn: typeof console.warn;
  
	return {
	  name: 'suppress-warnings',
	  apply: 'build',
	  configResolved() {
		originalWarn = console.warn;
		console.warn = function (msg: any, ...args: any[]) {
		  if (
			typeof msg === 'string' &&
			(
			  msg.includes('can\'t be bundled without type="module"') ||
			  msg.includes("doesn't exist at build time")
			)
		  ) {
			return;
		  }
		  originalWarn.call(console, msg, ...args);
		};
	  },
	  closeBundle() {
		if (originalWarn) {
		  console.warn = originalWarn;
		}
	  }
	};
  }
  