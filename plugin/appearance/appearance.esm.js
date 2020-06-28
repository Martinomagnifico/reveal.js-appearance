
/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Appearance.js for Reveal.js 
 * Version 1.0.7
 * 
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js 
 *  - Daniel Eden, Animate.css
 ******************************************************************/


var Plugin = function Plugin() {
  // Scope support polyfill
  try {
    document.querySelector(":scope *");
  } catch (t) {
    !function (t) {
      var e = /:scope(?![\w-])/gi,
          r = u(t.querySelector);

      t.querySelector = function (t) {
        return r.apply(this, arguments);
      };

      var c = u(t.querySelectorAll);

      if (t.querySelectorAll = function (t) {
        return c.apply(this, arguments);
      }, t.matches) {
        var n = u(t.matches);

        t.matches = function (t) {
          return n.apply(this, arguments);
        };
      }

      if (t.closest) {
        var o = u(t.closest);

        t.closest = function (t) {
          return o.apply(this, arguments);
        };
      }

      function u(t) {
        return function (r) {
          if (r && e.test(r)) {
            var _c = "q" + Math.floor(9e6 * Math.random()) + 1e6;

            arguments[0] = r.replace(e, "[" + _c + "]"), this.setAttribute(_c, "");

            var _n = t.apply(this, arguments);

            return this.removeAttribute(_c), _n;
          }

          return t.apply(this, arguments);
        };
      }
    }(Element.prototype);
  }

  var appear = function appear(deck, options) {
    var timeouts = [];

    var clearTimeOuts = function clearTimeOuts(timeouts) {
      for (var i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
      }

      timeouts = [];
    };

    var loopAppearances = function loopAppearances(appearances, appearancesInFragment) {
      var delay = 0;
      appearances.filter(function (element, i) {
        if (!(appearancesInFragment.indexOf(element) > -1)) {
          var delayincrement = parseInt(element.dataset.delay ? element.dataset.delay : i > 0 ? options.delay : 0);
          delay += delayincrement;
          timeouts.push(setTimeout(function () {
            element.classList.add(options.visibleclass);
          }, delay));
        }
      });
    };

    var selectionArray = function selectionArray(container, selectors) {
      var selections = container.querySelectorAll(selectors);
      var selectionarray = Array.prototype.slice.call(selections);
      return selectionarray;
    };

    var showAppearances = function showAppearances(container) {
      var appearances = selectionArray(container, ":scope ." + options.baseclass);
      var appearancesInFragment = selectionArray(container, ":scope .fragment .".concat(options.baseclass));
      loopAppearances(appearances, appearancesInFragment);
    };

    var hideAppearances = function hideAppearances(container) {
      var disappearances = selectionArray(container, ":scope .".concat(options.baseclass, ", :scope .fragment.visible"));
      disappearances.filter(function (element) {
        element.classList.remove(element.classList.contains("fragment") ? "visible" : options.visibleclass);
      });
    };

    var showHideSlide = function showHideSlide(event) {
      clearTimeOuts(timeouts);
      showAppearances(event.currentSlide);

      if (event.previousSlide && options.hideagain) {
        hideAppearances(event.previousSlide);
      }
    };

    var showHideFragment = function showHideFragment(event) {
      if (event.type == "fragmentshowncomplete" || event.type == "fragmentshown") {
        showAppearances(event.fragment);
      } else {
        hideAppearances(event.fragment);
      }
    };

    deck.on('ready', function (event) {
      showHideSlide(event);
    });
    deck.on('slidetransitionend', function (event) {
      showHideSlide(event);
    });
    deck.on('fragmentshown', function (event) {
      showHideFragment(event);
    });
    deck.on('fragmenthidden', function (event) {
      showHideFragment(event);
    });
  };

  var init = function init(deck) {
    var defaultOptions = {
      baseclass: 'animated',
      visibleclass: 'in',
      hideagain: true,
      delay: 300
    };

    var defaults = function defaults(options, defaultOptions) {
      for (var i in defaultOptions) {
        if (!options.hasOwnProperty(i)) {
          options[i] = defaultOptions[i];
        }
      }
    };

    var options = deck.getConfig().appearance || {};
    defaults(options, defaultOptions);
    appear(deck, options);
  };

  return {
    id: 'appearance',
    init: init
  };
};

export default Plugin;
