export const convertToSpans = (parent, kind) => {

	let splitElements = false;
	let joinChar = ' ';

	if (kind == "words") {
		splitElements = parent.textContent.trim().split(/\s+/);
		
	} else if (kind == "letters") {
		splitElements = parent.textContent.trim().split('');
		joinChar = '';
	}

	if (splitElements) {
		const parentAnimateClasses = Array.from(parent.classList).filter(className => className.startsWith('animate__'));
	
		const newHtml = splitElements.map((element, index) => {
			const span = document.createElement('span');
			span.textContent = element;
			if (element == " ") {span.textContent = "\u00A0"}
	
			if (parent.dataset.delay && index !== 0) {
				span.dataset.delay = parent.dataset.delay
			}

			if (parent.dataset.containerDelay && index === 0) {
				span.dataset.delay = parent.dataset.containerDelay
			}
	
			parent.classList.forEach(className => className.startsWith('animate__') && span.classList.add(className));
			return span.outerHTML;
			
		}).join(joinChar);
	
		parentAnimateClasses.forEach(className => parent.classList.remove(className));
		parent.removeAttribute('data-delay');
		parent.removeAttribute('data-split');
		parent.removeAttribute('data-container-delay');
	
		parent.innerHTML = newHtml;
	}


};