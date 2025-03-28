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
    indexh: number;
    indexv: number;
    bubbles: boolean;
    cancelable: true;
    target: HTMLElement;
    currentTarget: null;
    defaultPrevented: boolean;
    eventPhase: number;
}

// export interface ImportMeta {
//     readonly env: {
//       readonly DEV: boolean;
//       readonly PROD: boolean;
//       readonly MODE: string;
//       [key: string]: any;
//     };
// }