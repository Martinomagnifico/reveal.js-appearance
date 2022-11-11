
/*****************************************************************
 * @author: Martijn De Jongh (Martino), martijn.de.jongh@gmail.com
 * https://github.com/Martinomagnifico
 *
 * Appearance.js for Reveal.js 
 * Version 1.1.3
 * 
 * @license 
 * MIT licensed
 *
 * Thanks to:
 *  - Hakim El Hattab, Reveal.js 
 *  - Daniel Eden, Animate.css
 ******************************************************************/


(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Appearance = factory());
})(this, (function () { 'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
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

    var loadStyle = function loadStyle(url, type, callback) {
      var head = document.querySelector('head');
      var style;
      style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = url;

      var finish = function finish() {
        if (typeof callback === 'function') {
          callback.call();
          callback = null;
        }
      };

      style.onload = finish;

      style.onreadystatechange = function () {
        if (this.readyState === 'loaded') {
          finish();
        }
      };

      head.appendChild(style);
    };

    var selectionArray = function selectionArray(container, selectors) {
      var selections = container.querySelectorAll(selectors);
      var selectionarray = Array.prototype.slice.call(selections);
      return selectionarray;
    };

    var appear = function appear(deck, options) {
      var baseclass = 'animate__animated';
      var appearanceSelector = options.compatibility ? ".".concat(options.compatibilitybaseclass) : ".".concat(baseclass);
      var fragmentSelector = ".fragment";
      var sections = deck.getRevealElement().querySelectorAll(".slides section");
      var fragments = deck.getRevealElement().querySelectorAll(fragmentSelector);
      var animatecss = '[class^="animate__"],[class*=" animate__"]';

      var debugLog = function debugLog(text) {
        if (options.debug) console.log(text);
      };

      var findAppearancesIn = function findAppearancesIn(container, includeClass, excludeClass) {
        if (!isStack(container)) {
          var appearances = selectionArray(container, ":scope ".concat(includeClass));
          var excludes = selectionArray(container, ":scope ".concat(excludeClass, " ").concat(includeClass));
          var delay = 0;
          appearances.filter(function (appearance, index) {
            if (!(excludes.indexOf(appearance) > -1)) {
              if (index == 0 && appearance.dataset.delay || index != 0) {
                var elementDelay = appearance.dataset.delay ? parseInt(appearance.dataset.delay) : options.delay;
                delay = delay + elementDelay;
                appearance.style.setProperty('animation-delay', delay + "ms");
              }
            }
          });
        }
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
                if (!autoAppearance.classList.contains(baseclass)) {
                  autoAppearance.classList.add(baseclass);
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

      var isStack = function isStack(section) {
        var isStack = false;

        for (var i = 0; i < section.childNodes.length; i++) {
          if (section.childNodes[i].tagName == "SECTION") {
            isStack = true;
            break;
          }
        }

        return isStack;
      };

      if (options.compatibility) {
        animatecss = '.backInDown, .backInLeft, .backInRight, .backInUp, .bounceIn, .bounceInDown, .bounceInLeft, .bounceInRight, .bounceInUp, .fadeIn, .fadeInDown, .fadeInDownBig, .fadeInLeft, .fadeInLeftBig, .fadeInRight, .fadeInRightBig, .fadeInUp, .fadeInUpBig, .fadeInTopLeft, .fadeInTopRight, .fadeInBottomLeft, .fadeInBottomRight, .flipInX, .flipInY, .lightSpeedInRight, .lightSpeedInLeft, .rotateIn, .rotateInDownLeft, .rotateInDownRight, .rotateInUpLeft, .rotateInUpRight, .jackInTheBox, .rollIn, .zoomIn, .zoomInDown, .zoomInLeft, .zoomInRight, .zoomInUp, .slideInDown, .slideInLeft, .slideInRight, .slideInUp, .skidLeft, .skidLeftBig, .skidRight, .skidRightBig, .shrinkIn, .shrinkInBlur';
        baseclass = options.compatibilitybaseclass;
      }

      var allappearances = deck.getRevealElement().querySelectorAll(animatecss);
      allappearances.forEach(function (appearance) {
        if (!appearance.classList.contains(baseclass)) {
          appearance.classList.add(baseclass);
        }
      });
      autoAdd();
      sections.forEach(function (section) {
        findAppearancesIn(section, appearanceSelector, fragmentSelector);
      });
      fragments.forEach(function (fragment) {
        findAppearancesIn(fragment, appearanceSelector, fragmentSelector);
      });

      var fromTo = function fromTo(event) {
        var slides = {};
        slides.from = event.fromSlide ? event.fromSlide : event.previousSlide ? event.previousSlide : null;
        slides.to = event.toSlide ? event.toSlide : event.currentSlide ? event.currentSlide : null;
        return slides;
      };

      var showHideSlide = function showHideSlide(event) {
        var _slides$to;

        var etype = event.type;
        var slides = fromTo(event);
        debugLog(etype);

        if (((_slides$to = slides.to) === null || _slides$to === void 0 ? void 0 : _slides$to.dataset.appearevent) == "auto") {
          slides.to.dataset.appearevent = "autoanimate";
        }

        if (options.appearevent == "auto") {
          options.appearevent = "autoanimate";
        }

        if (etype == "ready") {
          slides.to.dataset.appearanceCanStart = true;
        }

        if (slides.to) {
          var appearevent = slides.to.dataset.appearevent ? slides.to.dataset.appearevent : options.appearevent;

          if (etype == appearevent || etype == "slidetransitionend" && appearevent == "autoanimate") {
            slides.to.dataset.appearanceCanStart = true;
          }

          if (etype == "slidetransitionend") {
            if (options.hideagain) {
              if (slides.from) {
                if (slides.from.dataset.appearanceCanStart) {
                  delete slides.from.dataset.appearanceCanStart;
                }

                var fromFragments = slides.from.querySelectorAll(".fragment.visible");

                if (fromFragments) {
                  fromFragments.forEach(function (fragment) {
                    fragment.classList.remove('visible');
                  });
                }
              }
            }
          }

          if (event.type == 'slidechanged' && document.body.dataset.exitoverview) {
            if (options.hideagain) {
              var _slides$from;

              (_slides$from = slides.from) === null || _slides$from === void 0 ? true : delete _slides$from.dataset.appearanceCanStart;
            }

            slides.to.dataset.appearanceCanStart = true;
          } else if (event.type == 'overviewhidden') {
            document.body.dataset.exitoverview = true;
            setTimeout(function () {
              document.body.removeAttribute('data-exitoverview');
            }, 500);

            if (event.currentSlide) {
              if (options.hideagain) {
                var _slides$from2;

                (_slides$from2 = slides.from) === null || _slides$from2 === void 0 ? true : delete _slides$from2.dataset.appearanceCanStart;
              }

              slides.to.dataset.appearanceCanStart = true;
            }
          }
        }
      };

      var eventnames = ['ready', 'slidechanged', 'slidetransitionend', 'autoanimate', 'overviewhidden'];
      eventnames.forEach(function (eventname) {
        return deck.on(eventname, function (event) {
          showHideSlide(event);
        });
      });
    };

    var init = function init(deck) {
      var es5Filename = "appearance.js";
      var defaultOptions = {
        baseclass: 'animate__animated',
        hideagain: true,
        delay: 300,
        debug: false,
        appearevent: 'slidetransitionend',
        autoappear: false,
        autoelements: false,
        csspath: '',
        animatecsspath: {
          link: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
          compat: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.compat.css'
        },
        compatibility: false,
        compatibilitybaseclass: 'animated'
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

      function pluginPath() {
        var path;
        var pluginScript = document.querySelector("script[src$=\"".concat(es5Filename, "\"]"));

        if (pluginScript) {
          path = pluginScript.getAttribute("src").slice(0, -1 * es5Filename.length);
        } else {
          path = (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('appearance.js', document.baseURI).href)).slice(0, (typeof document === 'undefined' && typeof location === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : typeof document === 'undefined' ? location.href : (document.currentScript && document.currentScript.src || new URL('appearance.js', document.baseURI).href)).lastIndexOf('/') + 1);
        }

        return path;
      }

      var AppearanceStylePath = options.csspath.appearance ? options.csspath.appearance : "".concat(pluginPath(), "appearance.css") || 'plugin/appearance/appearance.css';
      var AnimateCSSPath = !options.compatibility ? options.animatecsspath.link : options.animatecsspath.compat;

      if (options.debug) {
        console.log("Plugin path = ".concat(pluginPath()));
        console.log("Compatibility mode: ".concat(options.compatibility));
        console.log("Appearance CSS path = ".concat(AppearanceStylePath));
        console.log("AnimateCSS CSS path = ".concat(AnimateCSSPath));
      }

      loadStyle(AnimateCSSPath, 'stylesheet', function () {
        loadStyle(AppearanceStylePath, 'stylesheet');
      });
      appear(deck, options);
    };

    return {
      id: 'appearance',
      init: init
    };
  };

  return Plugin;

}));
