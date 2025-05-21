/**
 * Converts the text content of a parent element into individual span elements
 * based on the specified kind of split (words or letters).
 *
 * @param parent The parent element containing the text to be split
 * @param kind The type of split to perform ('words' or 'letters')
 */

export function convertToSpans(parent: HTMLElement, kind: string): void {
    let splitElements: string[] | false = false;
    let joinChar = " ";

    // Early return if no text content
    if (!parent.textContent?.trim()) return;

    // Handle word and letter splitting
    if (kind === "words") {
        splitElements = parent.textContent.trim().split(/\s+/) || [];
    } else if (kind === "letters") {
        splitElements = parent.textContent.trim().split("") || [];
        joinChar = "";
    }

    if (splitElements && splitElements.length > 0) {
        // Get all animation classes from the parent
        const parentAnimateClasses = Array.from(parent.classList).filter((className) =>
            className.startsWith("animate__")
        );

        // Create spans for each split element
        const newHtml = splitElements
            .map((element, index) => {
                const span = document.createElement("span");
                span.textContent = element === " " ? "\u00A0" : element; // Handle space

                // Handle delay attributes
                if (parent.dataset.delay && index !== 0) {
                    span.dataset.delay = parent.dataset.delay;
                }

                if (parent.dataset.containerDelay && index === 0) {
                    span.dataset.delay = parent.dataset.containerDelay;
                }

                // Add animation classes from parent to each span
                for (let i = 0; i < parentAnimateClasses.length; i++) {
                    span.classList.add(parentAnimateClasses[i]);
                }

                return span.outerHTML;
            })
            .join(joinChar);

        // Add wordchargroup class to parent
        parent.classList.add("wordchargroup");

        // Remove animation classes from parent
        for (let i = 0; i < parentAnimateClasses.length; i++) {
            parent.classList.remove(parentAnimateClasses[i]);
        }

        // Remove data attributes that are no longer needed
        parent.removeAttribute("data-delay");
        parent.removeAttribute("data-split");
        parent.removeAttribute("data-container-delay");

        // Update the parent HTML
        parent.innerHTML = newHtml;
    }
}
