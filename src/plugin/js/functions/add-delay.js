export const addDelay = (appearanceArray, options, names) => {

    let delay = 0;
    appearanceArray.forEach((appearance, index) => {

        if ((index == 0 && appearance.dataset.delay) || index !=0) {

            let elementDelay = options.delay;

            if (appearance.dataset && appearance.dataset.delay) {
                elementDelay = parseInt(appearance.dataset.delay);
            }

            delay = delay + elementDelay;

            appearance.style.setProperty('animation-delay', delay + "ms");
            appearance.removeAttribute('data-delay');
        }

    })

}
