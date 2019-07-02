"use strict";

/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Transit.js for Reveal.js 1.0.2
 *
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js
******************************************************************/

var Transit = window.Transit || function () {
  var options = Reveal.getConfig().transit || {};
  var defaultOptions = {};

  var defaults = function defaults(options, defaultOptions) {
    for (var i in defaultOptions) {
      if (!options.hasOwnProperty(i)) {
        options[i] = defaultOptions[i];
      }
    }
  }; 
  
  // Handy functions from Reveal.js
  function extend(a, b) {
    for (var i in b) {
      a[i] = b[i];
    }
    return a;
  }

  function dispatchEvent(type, args) {
    var event = document.createEvent('HTMLEvents', 1, 2);
    event.initEvent(type, true, true);
    extend(event, args);
    parent.dispatchEvent(event);
  }

  var selectionArray = function selectionArray(container, selectors) {
    var selections = container.querySelectorAll(selectors);
    var selectionarray = Array.prototype.slice.call(selections);
    return selectionarray;
  };

  var farFrom = function farFrom(prevSlide) {
    var lastOpacity = window.getComputedStyle(prevSlide, null).opacity;
    var lastParentOpacity = window.getComputedStyle(prevSlide.parentNode, null).opacity;

    if (lastOpacity != 0 && lastParentOpacity != 0) {
      return false;
    } else if (lastOpacity != 1 && lastParentOpacity == 1) {
      return true;
    } else {
      return false;
    }
  };

  var slideAppear = function slideAppear(event) {
    var parent = document.querySelector(".slides");
    var currentSlideBefore = event.currentSlide;

    var emitSlid = function emitSlid(curSlide, prevSlide) {
      dispatchEvent('slidechangecomplete', {
        'previousSlide': prevSlide,
        'currentSlide': curSlide
      });

      if (options.debug) {
        console.log("Slide change complete");
      }
    };

    var slideChanged = function slideChanged() {
      if (Reveal.getCurrentSlide() == currentSlideBefore) {
        parent.removeEventListener('transitionend', waitForFadeOut);
        Reveal.getCurrentSlide().classList.add("done");

        if (Reveal.getPreviousSlide()) {
          var previousSlide = Reveal.getPreviousSlide();
          previousSlide.classList.remove("done");
          var fragments = selectionArray(previousSlide, ":scope .fragment");
          fragments.filter(function (fragment) {
            fragment.classList.remove("done");
          });
        }

        emitSlid(Reveal.getCurrentSlide(), Reveal.getPreviousSlide());
      }
    };

    var waitForFadeOut = function waitForFadeOut(endevent) {
      if (endevent.target.tagName == "SECTION" && endevent.propertyName == "transform") {
        slideChanged();
      }
    };

    if (event.type == "ready") {
      slideChanged();
    } else if (event.previousSlide) {
      if (farFrom(event.previousSlide) == true) {
        slideChanged();
      } else {
        parent.addEventListener('transitionend', waitForFadeOut, false);
      }
    } else {
      parent.addEventListener('transitionend', waitForFadeOut, false);
    }
  };

  var fragmentChange = function fragmentChange(event) {
    var fragment = event.fragment;

    var waitForFragment = function waitForFragment(endevent) {
      if (endevent.target == fragment && endevent.propertyName == "opacity") {
        fragment.removeEventListener('transitionend', waitForFragment);

        if (fragment.classList.contains("visible")) {
          fragment.classList.add("done");
          dispatchEvent('fragmentshowncomplete', {
            'fragment': fragment
          });
        } else {
          fragment.classList.remove("done");
          dispatchEvent('fragmenthiddencomplete', {
            'fragment': fragment
          });
        }
      }
    };

    fragment.addEventListener('transitionend', waitForFragment);
  };

  var init = function init() {
    defaults(options, defaultOptions);
    Reveal.addEventListener('slidechanged', slideAppear, false);
    Reveal.addEventListener('ready', slideAppear, false);
    Reveal.addEventListener('fragmentshown', fragmentChange, false);
    Reveal.addEventListener('fragmenthidden', fragmentChange, false);
  };

  return {
    init: init
  };
}();

Reveal.registerPlugin('transit', Transit);
/* global Reveal */