"use strict";

/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Transit.js for Reveal.js 1.0.4
 *
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js
******************************************************************/


const Transit = window.Transit || (function () {

	// Scope support polyfill
	try{document.querySelector(":scope *")}catch(t){!function(t){let e=/:scope(?![\w-])/gi,r=u(t.querySelector);t.querySelector=function(t){return r.apply(this,arguments)};let c=u(t.querySelectorAll);if(t.querySelectorAll=function(t){return c.apply(this,arguments)},t.matches){let n=u(t.matches);t.matches=function(t){return n.apply(this,arguments)}}if(t.closest){let o=u(t.closest);t.closest=function(t){return o.apply(this,arguments)}}function u(t){return function(r){if(r&&e.test(r)){let c="q"+Math.floor(9e6*Math.random())+1e6;arguments[0]=r.replace(e,"["+c+"]"),this.setAttribute(c,"");let n=t.apply(this,arguments);return this.removeAttribute(c),n}return t.apply(this,arguments)}}}(Element.prototype)}
	
	let options = Reveal.getConfig().transit || {};
	let defaultOptions = {};
	const parent = document.querySelector(".slides");

	const defaults = function (options, defaultOptions) {
		for ( var i in defaultOptions ) {
			if ( !options.hasOwnProperty( i ) ) {
				options[i] = defaultOptions[i];
			}
		}
	}
	
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
	
	const selectionArray = function (container, selectors) {
		let selections = container.querySelectorAll(selectors);
		let selectionarray = Array.prototype.slice.call(selections);
		return selectionarray
	};

	const farFrom = function (prevSlide) {
		let lastOpacity = window.getComputedStyle(prevSlide, null).opacity;
		let lastParentOpacity = window.getComputedStyle(prevSlide.parentNode, null).opacity; 

		if ( lastOpacity != 0 && lastParentOpacity != 0 ){
			return false
		} else
		if ( lastOpacity != 1  && lastParentOpacity == 1 ){
			return true
		} else {
			return false
		}
	}


	const slideAppear = function (event) {
		let currentSlideBefore = event.currentSlide;

		const emitSlid = function (curSlide, prevSlide) {
			dispatchEvent( 'slidechangecomplete', {
				'previousSlide': prevSlide,
				'currentSlide': curSlide
			} );
			if (options.debug) {
				console.log("Slide change complete")
			}
		};

		const slideChanged = function () {
			
			if (Reveal.getCurrentSlide() == currentSlideBefore) {
				parent.removeEventListener('transitionend', waitForFadeOut);
				Reveal.getCurrentSlide().classList.add("done");
				
				if (Reveal.getPreviousSlide()) {
					let previousSlide = Reveal.getPreviousSlide();
					previousSlide.classList.remove("done");
					let fragments = selectionArray(previousSlide, ":scope .fragment");
	          			fragments.filter(function (fragment) {
            					fragment.classList.remove("done");
          				});
				}
				emitSlid(Reveal.getCurrentSlide(), Reveal.getPreviousSlide());
			}
		};

		const waitForFadeOut = function (endevent) {
			if (endevent.target.tagName == "SECTION" && endevent.propertyName == "transform") {
				slideChanged();
			}
		};

		if (event.type == "ready") {
			slideChanged();
		} else if (event.previousSlide) {
			if ( farFrom(event.previousSlide) == true) {
				slideChanged();
			} else {
				parent.addEventListener('transitionend', waitForFadeOut, false);
			}
		} else {
			parent.addEventListener('transitionend', waitForFadeOut, false);
		}
	}; 

	const fragmentChange = function (event) {

		let fragment = event.fragment;

		const waitForFragment = function (endevent) {
			
			if (endevent.target == fragment && endevent.propertyName == "opacity" ) {

				fragment.removeEventListener('transitionend', waitForFragment);
				
				if (fragment.classList.contains("visible") ){
					fragment.classList.add("done");
					dispatchEvent( 'fragmentshowncomplete', {
						'fragment': fragment
					} );
				} else {
					fragment.classList.remove("done");
					dispatchEvent( 'fragmenthiddencomplete', {
						'fragment': fragment
					} );
				}
			}
			
		};
		fragment.addEventListener('transitionend', waitForFragment);
	}
	
	const init = function () {
		defaults( options, defaultOptions );
		Reveal.addEventListener('slidechanged', slideAppear, false);
		Reveal.addEventListener('ready', slideAppear, false);
		Reveal.addEventListener('fragmentshown', fragmentChange, false);
		Reveal.addEventListener('fragmenthidden', fragmentChange, false);
	};

	return {
		init: init
	};

})();

Reveal.registerPlugin( 'transit', Transit );
/* global Reveal */