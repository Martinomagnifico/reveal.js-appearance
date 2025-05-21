export interface SlideMapItem {
    index: number;
    id?: string;
    name: string | null;
    stopInheritance?: boolean;
    state?: string;
    isVertical?: boolean;
    parentIndex?: number;
    verticalIndex?: number;
    langattr?: string | null;
    slideNumber?: number;
}

export interface RevealSlideEvent {
    type: string;
    currentSlide: HTMLElement;
    previousSlide: HTMLElement;
    fromSlide?: HTMLElement;
    toSlide?: HTMLElement;
    indexh: number;
    indexv: number;
    bubbles: boolean;
    cancelable: true;
    target: HTMLElement;
    currentTarget: null;
    defaultPrevented: boolean;
    eventPhase: number;
}

export interface RevealFragmentEvent extends RevealSlideEvent {
    /** only `fragmentshown` or `fragmenthidden` */
    type: "fragmentshown" | "fragmenthidden";

    /** the fragment element stepped to */
    fragment: HTMLElement;
}
