
/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Appearance.js for Reveal.js 
 * Version 1.1.1
 * 
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js 
 *  - Daniel Eden, Animate.css
 ******************************************************************/


function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

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
    var debugLog = function debugLog(text) {
      if (options.debug) console.log(text);
    };

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

    var autoAdd = function autoAdd() {
      if (options.autoelements) {
        var _loop = function _loop() {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              autoelement = _Object$entries$_i[0],
              autoanimation = _Object$entries$_i[1];

          if (options.autoappear) {
            debugLog("All \"".concat(autoelement, "\"\" elements will animate with ").concat(autoanimation));
          }

          var autosection = options.autoappear ? "" : "[data-autoappear] ";
          var autoAppearances = deck.getRevealElement().querySelectorAll(".slides ".concat(autosection).concat(autoelement));

          if (autoAppearances.length > 0) {
            autoAppearances.forEach(function (autoAppearance) {
              if (!autoAppearance.classList.contains(options.baseclass)) {
                autoAppearance.classList.add(options.baseclass);
                autoAppearance.classList.add(autoanimation);
              }
            });
          }
        };

        for (var _i = 0, _Object$entries = Object.entries(options.autoelements); _i < _Object$entries.length; _i++) {
          _loop();
        }
      } else if (options.autoappear) {
        console.log("Please set an \"autoelements\" object.");
      }
    };

    var showAppearances = function showAppearances(container) {
      clearTimeOuts(timeouts);
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

    var fromTo = function fromTo(event) {
      var slides = {};
      slides.from = event.fromSlide ? event.fromSlide : event.previousSlide ? event.previousSlide : null;
      slides.to = event.toSlide ? event.toSlide : event.currentSlide ? event.currentSlide : null;
      return slides;
    };

    var showHideSlide = function showHideSlide(event) {
      var slides = fromTo(event);

      if (slides.to.dataset.appearevent == "auto") {
        slides.to.dataset.appearevent = "autoanimate";
      }

      if (options.appearevent == "auto") {
        options.appearevent = "autoanimate";
      }

      if (!slides.to.dataset.eventdone) {
        debugLog("Event: '".concat(event.type, "'"));

        if (event.type == "ready") {
          showAppearances(slides.to);
        } else if (event.type == slides.to.dataset.appearevent) {
          slides.to.dataset.eventdone = true;
          showAppearances(slides.to);
        } else if (event.type == options.appearevent) {
          slides.to.dataset.eventdone = true;
          showAppearances(slides.to);
        } else if (event.type == "slidetransitionend" && options.appearevent == "autoanimate") {
          slides.to.dataset.eventdone = true;
          showAppearances(slides.to);
        } else if (event.type == 'slidechanged' && document.body.dataset.exitoverview) {
          if (slides.from && options.hideagain) {
            hideAppearances(slides.to);
          }

          showAppearances(slides.to);
          slides.to.dataset.eventdone = true;
        } else if (event.type == 'overviewhidden') {
          document.body.dataset.exitoverview = true;
          setTimeout(function () {
            document.body.removeAttribute('data-exitoverview');
          }, 500);

          if (event.currentSlide) {
            if (slides.from && options.hideagain) {
              hideAppearances(event.previousSlide);
            }

            showAppearances(slides.to);
            event.currentSlide.dataset.eventdone = true;
          }
        }
      }

      if (event.type == "slidechanged" && slides.from) {
        slides.from.removeAttribute('data-eventdone');
      }

      if (slides.from) {
        if (event.type == 'slidetransitionend' && options.hideagain) {
          hideAppearances(slides.from);
        }
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
      autoAdd();
      showHideSlide(event);
    });
    deck.on('slidechanged', function (event) {
      showHideSlide(event);
    });
    deck.on('slidetransitionend', function (event) {
      showHideSlide(event);
    });
    deck.on('autoanimate', function (event) {
      showHideSlide(event);
    });
    deck.on('overviewhidden', function (event) {
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
      delay: 300,
      debug: false,
      appearevent: 'slidetransitionend',
      autoappear: false,
      autoelements: null
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
