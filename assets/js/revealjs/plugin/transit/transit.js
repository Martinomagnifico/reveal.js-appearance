/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Transit.js for Reveal.js 1.0.0
 *
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js
******************************************************************/


const Transit = window.Transit || (function () {
	
	// Handy functions from Reveal.js
	function extend( a, b ) {
		for( var i in b ) {
			a[ i ] = b[ i ];
		}
		return a;
	}

	function dispatchEvent( type, args ) {
		var event = document.createEvent( 'HTMLEvents', 1, 2 );
		event.initEvent( type, true, true );
		extend( event, args );
		parent.dispatchEvent( event );
	}

	const slideAppear = function (event) {

		let parent = document.querySelector(".slides");
		let currentSlideBefore = event.currentSlide;

		const emitSlid = function (curSlide, prevSlide) {
			dispatchEvent( 'slidechangecomplete', {
				'previousSlide': prevSlide,
				'currentSlide': curSlide
			} );
		};

		const slideChanged = function () {
			if (Reveal.getCurrentSlide() == currentSlideBefore) {
				parent.removeEventListener('transitionend', waitForFadeOut);
				Reveal.getCurrentSlide().classList.add("done");
				if (Reveal.getPreviousSlide()) {
					Reveal.getPreviousSlide().classList.remove("done");
				}
				
				emitSlid(Reveal.getCurrentSlide(), Reveal.getPreviousSlide());
			}
		};
		const waitForFadeOut = function (endevent) {
			if (endevent.target.tagName == "SECTION" && endevent.propertyName == "transform") {
				slideChanged() ;
			}
		};
		
		if (event.type == "ready") {
			slideChanged()
		}

		parent.addEventListener('transitionend', waitForFadeOut);

	};

	const fragmentAppear = function (event) {

		let fragment = event.fragment;

		const waitForFadeOut = function (endevent) {
			if ( endevent.target.classList.contains("fragment") && endevent.propertyName == "opacity"  ) {

				fragment.removeEventListener('transitionend', waitForFadeOut);
				
				if (endevent.target.classList.contains("visible") ){
					endevent.target.classList.add("done");
					dispatchEvent( 'fragmentshowncomplete', {
						'fragment': fragment
					} );
				} else {
					endevent.target.classList.remove("done");
					dispatchEvent( 'fragmenthiddencomplete', {
						'fragment': fragment
					} );
				}
			}
		};
		fragment.addEventListener('transitionend', waitForFadeOut);
	}

	const init = function () {
		Reveal.addEventListener('slidechanged', slideAppear, false);
		Reveal.addEventListener('ready', slideAppear), false;
		Reveal.addEventListener('fragmentshown', fragmentAppear, false);
		Reveal.addEventListener('fragmenthidden', fragmentAppear, false);
	};

	return {
		init: init
	};

})();

Reveal.registerPlugin( 'transit', Transit );
/* global Reveal */