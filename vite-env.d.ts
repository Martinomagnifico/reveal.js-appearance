interface ImportMeta {
	readonly env: {
	  readonly DEV: boolean;
	  readonly PROD: boolean;
	  readonly MODE: string;
	  [key: string]: any;
	};
  }
  
  declare module '*.scss' {
	const content: { [className: string]: string };
	export default content;
  }