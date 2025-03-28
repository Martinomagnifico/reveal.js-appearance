import type { Api } from 'reveal.js';
import type { Config } from "./config";
import { AppearanceConsts, initConsts } from './consts';

import { debug, isStack } from "./helpers";

// Imports for element preparation
import { addAutoAnimation } from './functions/add-auto-animation';
import { addBaseClass } from './functions/add-base-class';
import { fixListItem } from './functions/fix-list-item';
import { convertToSpans } from './functions/convert-to-spans';
import { getAppearanceArrays } from './functions/get-appearance-arrays';
import { addDelay } from './functions/add-delay';
import { showHideSlide } from './functions/show-hide-slide';


export class Appearance {
    private readonly deck: Api;
    private readonly viewport: HTMLElement;
    private readonly revealEl: HTMLElement;
    private readonly slides: HTMLElement;
    private readonly options: Config;
    private readonly consts: AppearanceConsts;
    private readonly sections: NodeListOf<Element>;
    private readonly regularSections: Element[];
    private readonly fragments: NodeListOf<Element>;
    private appearances: Element[];
    
    private constructor(deck: Api, options: Config) {
        this.deck = deck;
        this.options = options;
        
        // Get Reveal.js elements
        this.viewport = deck.getViewportElement() as HTMLElement;
        this.revealEl = deck.getRevealElement() as HTMLElement;
        this.slides = deck.getSlidesElement() as HTMLElement;
        
        // Initialize constants
        this.consts = initConsts(
            options.baseclass,
            options.compatibilitybaseclass,
            options.compatibility
        );
        
        // Get sections and fragments
        this.sections = this.slides.querySelectorAll('section');
        this.regularSections = Array.from(this.sections).filter(section => !isStack(section));
        this.fragments = this.slides.querySelectorAll(this.consts.fragmentSelector);
        
        // Initialize appearances array (will be filled later)
        this.appearances = [];
        
        // Check if Speaker view window
        if (/receiver/i.test(window.location.search)) {
            this.viewport.classList.add('sv');
        }
    }
    
    /**
     * Prepare appearance elements
     */
    private async prepareElements(): Promise<void> {
        debug.log(this.options, "Preparing appearance elements");
        
        // Find all appearance elements
        this.appearances = Array.from(this.slides.querySelectorAll(this.consts.animatecss));
        
        // Process each section for auto animations
        this.regularSections.forEach(section => 
            addAutoAnimation(section, this.options, this.appearances)
        );
        
        // Process each appearance element
        this.appearances.forEach(element => {
            fixListItem(element, this.options, this.consts);
            addBaseClass(element, this.consts);
            if (element instanceof HTMLElement && element.dataset.split) {
                convertToSpans(element, element.dataset.split);
            }
        });

        // Process delays for sections
        this.regularSections.forEach(section => {
            const appearanceArrays = getAppearanceArrays(
                section,
                this.consts.baseclass,
                this.consts.fragmentClass
            );
            
            if (appearanceArrays) {
                appearanceArrays.forEach(array => addDelay(array, this.options, this.consts));
            }
        });
    }
    
    /**
     * Set up event listeners
     */
    private setupEventListeners(): void {
        // Add event listeners for all defined event names
        this.consts.eventnames.forEach(eventname => {
            this.deck.on(eventname, (event: any) => {
                // Handle slide show/hide (placeholder)
                showHideSlide(event, this.options, this.consts, this.deck);
                debug.log(this.options, `Event triggered: ${eventname}`);
            });
        });
        
        // Animation end event
        this.viewport.addEventListener("animationend", (event) => {
            const target = event.target as Element;
            target.classList.add('animationended');
        });
        
        // Fragment hidden event
        this.viewport.addEventListener("fragmenthidden", (event: any) => {
            if (event.fragment) {
                event.fragment.classList.remove('animationended');
                event.fragment.querySelectorAll('.animationended').forEach((el: Element) => {
                    el.classList.remove('animationended');
                });
            }
        });
    }
    
    /**
     * Create a new Appearance instance
     */
    static async create(deck: Api, options: Config): Promise<Appearance> {
        debug.group("Appearance Plugin");
        const instance = new Appearance(deck, options);
        await instance.prepareElements();
        instance.setupEventListeners();
        debug.groupEnd();
        return instance;
    }
}