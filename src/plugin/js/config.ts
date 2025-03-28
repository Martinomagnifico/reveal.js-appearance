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
	compatibility: false,
	compatibilitybaseclass: 'animated'
  };
  
  export { defaultConfig };