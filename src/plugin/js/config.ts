export interface Config {
	baseclass: string;
	hideagain: boolean;
	delay: number;
	debug?: boolean;
	appearevent: string;
	autoappear: boolean;
	autoelements: boolean;
	appearparents: boolean;
	cssautoload: boolean;
	csspath: string;
	animatecsspath: {
	  link: string;
	  compat: string;
	};
	compatibility: boolean;
	compatibilitybaseclass: string;
  }
  
  const defaultConfig: Config = {
	baseclass: 'animate__animated',
	hideagain: true,
	delay: 300,
	appearevent: 'slidetransitionend',
	autoappear: false,
	autoelements: false,
	appearparents: false,
	cssautoload: true,
	csspath: '',
	animatecsspath: {
	  link: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
	  compat: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.compat.css',
	},
	compatibility: false,
	compatibilitybaseclass: 'animated'
  };
  
  export { defaultConfig };