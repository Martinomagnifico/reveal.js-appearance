# Appearance

[![Version](https://img.shields.io/npm/v/reveal.js-appearance)](#) [![Downloads](https://img.shields.io/npm/dt/reveal.js-appearance)](https://github.com/Martinomagnifico/reveal.js-appearance/archive/refs/heads/master.zip)

An animation plugin for [Reveal.js](https://revealjs.com) that animates elements sequentially like in Powerpoint. Perfect for online portfolios or other presentations with images.

[<img src="https://martinomagnifico.github.io/reveal.js-appearance/screenshot.png" width="100%">](https://martinomagnifico.github.io/reveal.js-appearance/demo/demo.html)

In Powerpoint you can make slides with items that appear automatically with effects. This plugin for Reveal.js tries to achieve the same result. It's easy to set up. It uses Animate.css by Daniel Eden for the animations, with some changes to allow for a non-animated state. 

* [Demo](https://martinomagnifico.github.io/reveal.js-appearance/demo/demo.html)
* [Markdown demo](https://martinomagnifico.github.io/reveal.js-appearance/demo/demo-markdown.html)

The animations will start automatically after or at each slide or fragment change if the HTML is set up to use Appearance.

Version 1.3.0 adds an option to animate the words in a sentence, or the letters in a word.


## Basics

There are really only three steps:

1. Install Appearance
2. Edit the markup to add animation classes
2. Enjoy the animations


## Installation

### Regular installation

Copy the appearance folder to the plugins folder of the reveal.js folder, like this: `plugin/appearance`.

### npm installation

This plugin is published to, and can be installed from, npm.

```console
npm install reveal.js-appearance
```
The Appearance plugin folder can then be referenced from `node_modules/reveal.js-appearance/plugin/appearance`



## Setup

### JavaScript

There are two JavaScript files for Appearance, a regular one, `appearance.js`, and a module one, `appearance.esm.js`. You only need one of them:

#### Regular 
If you're not using ES modules, for example, to be able to run your presentation from the filesystem, you can add it like this:

```html
<script type="text/javascript" src="dist/reveal.js"></script>
<script src="plugin/appearance/appearance.js"></script>
<script>
	Reveal.initialize({
		// ...
		plugins: [ Appearance ]
	});
</script>
```
#### As a module 
If you're using ES modules, you can add it like this:

```html
<script type="module">
	// This will need a server
	import Reveal from './dist/reveal.esm.js';
	import Appearance from './plugin/appearance/appearance.esm.js';
	Reveal.initialize({
		// ...
		plugins: [ Appearance ]
	});
</script>
```

### Styling
The styling of Appearance is automatically inserted **when the appearance folder is manually (or automatically) copied** to the Reveal.js plugin folder.

**BUT**: If you are using a bundler like Webpack or Parcel, that uses **import**, you will also need to **import** the CSS file yourself. Depending on your setup this can be something like this:

```
import 'reveal.js-appearance/plugin/appearance/appearance.css';
```

In that case, the `cssautoload` option (in the Reveal appearance options) should be set to `false`, to avoid style loading errors. 

> However, if you actually know the correct full path to the CSS file, then you can still use the `csspath` option and keep `cssautoload` set to `true`.


### HTML

It is easy to set up your HTML structure for Appearance. Each element that you want to animate uses a base class and an animation class. ***You only have to add an animation class*** because the base class is automatically added to any element with an animation class. The names of these animation classes are defined by [Animate.css](https://animate.style). In the example below, you can see that the animation class is `animate__bounceInLeft`:  

```html
<ul>
    <li class="animate__bounceInLeft">Add it to any text element</li>
    <li class="animate__bounceInLeft">Like list items, or headers.</li>
    <li class="animate__bounceInLeft">It adds some attention.</li>
</ul>
```

When you are working with Markdown (or in any other case), this can be a chore **so if you do not want to add all these classes**, you can set the option `autoappear` to `true` (see [Autoappear](#autoappear) below) and let Appearance do the heavy work.

#### Animating words and letters

To nicely animate the words in a heading, or the letters of a word, add an animation class to it, and add a data-attribute for the kind of split you want:  

```html
<h3 class="animate__fadeInDown" data-split="words">Let words apear and appear</h3>
<h3 class="animate__fadeInDown" data-split="letters">Let letters apear and appear</h3>
```


## Now change it

It is easy to change the effects for Appearance. 

### Changing the delay

Here's how to change the delay per element: 

```html
<img class="animate__fadeInDown" data-src="1.jpg" data-delay="200">
<img class="animate__fadeInDown" data-src="2.jpg" data-delay="160">
<img class="animate__fadeInDown" data-src="3.jpg" data-delay="120">
```

### Changing the speed

You can change the speed of each animation, using the tempo classes from Animate.css:

```html
<img class="animate__fadeInDown animate__slower" data-src="1.jpg">
<img class="animate__fadeInDown animate__slow" data-src="2.jpg">
<img class="animate__fadeInDown animate__fast" data-src="3.jpg">
<img class="animate__fadeInDown animate__faster" data-src="4.jpg">
```


### Changing word and letter animations

For words and letters, the same techniques can be used. 

Note that the data-delay also gets copied to the smaller elements in it, which means that there is no more 'whole sentence' or 'whole word' to delay. By default, the whole element then gets the delay (depending on if it is following other animations) as defined in the `delay` option in the Configuration, but it can be overriden by an optional `data-container-delay`.

Also note the (optional) `baseline` class here, which makes the words appear from the baseline of the text.

```html
<h3 class="animate__fadeInUp animate__faster baseline"
	data-split="words" 
	data-delay="80"
	data-container-delay="600">Let words apear and appear</h3>
```


### Changing the 'appearevent'
When you navigate from slide to slide, you can set transition effects in Reveal. These effects take some time. That's why, by default, Appearance only starts when the slide transition has ended. 

There are cases however, where there is hardly any transition, for example, when going from an autoanimate slide to another. Reveal then suppresses the user-set transition to a short opacity change. Starting *together with* the transition might then be nicer. You can use any of the following events:

* *slidetransitionend* (default, Appearance will always start animating elements after the transition)
* *slidechanged* (Appearance will always start together with the transition)
* *auto* (Appearance will start together with the transition, but only on autoanimate slides, other slides will use *slidetransitionend*)

```html
<section data-appearevent="auto">
    <ul>
        <li class="animate__fadeInLeft">This is list item 1</li>
        <li class="animate__fadeInLeft">This is list item 2</li>
        <li class="animate__fadeInLeft">This is list item 1</li>
    </ul>
</section>
```

These same event triggers can be set through the `appearevent` option in the global configuration. 

When using Appearance inside an autoanimate slide, and changing the appearevent to `slidechanged` or `auto`, keep in mind that Reveal transforms opacity for all non-autoanimate items, while Appearance does the same on most of the effects. To avoid strange behaviour, wrap these Appearance items in a parent. For example, a list of animated bullet points works well, because the animated class is on the children, not the parent. Separate headings or other elements do not have that, so should be wrapped.


## Autoappear

You can simplify the addition of animation classes.

Sometimes (for example with Markdown), adding classes to elements is a chore. Appearance can automatically add animation classes to specific elements (tags or other selectors) in the presentation (with the option autoappear) or per slide (with data-autoappear).

### Global autoappear mode

With the option `autoappear` set to `true`, ALL elements in the presentation that have a certain selector (and that are not already classed with your base animation class, like 'animated') will subsequently get this class, and thus an animation. These selectors and the animations can be set in the configuration options like this:  

```javascript
Reveal.initialize({
	// ...
	appearance: {
		// ...
		autoappear: true,
		autoelements: {
			'ul li': 'animate__fadeInLeft',
			'ol li': 'animate__fadeInRight'
		}
	},
	plugins: [ Appearance ]
});
```

You can add any selector and animation class to this object. You can use a simple JSON object, or more elaborate like this (you can also mix them): `{"ul li": {"animation":"animate__fadeInLeft", "speed":"slow", "delay":"100"}}`. An object like that can contain the following keys:

* animation
* speed
* delay
* split
* container-delay 

where the last two keys are specific for word- and letter-animations.

If you choose to write all your animation selectors and properties globally, you no longer need to add any classes to the markup and it can stay like this:

```html
<ul>
    <li>Add it to any text element</li>
	<li>Like list items, or headers.</li>
	<li>It adds some attention.</li>
</ul>
```
or like this in Markdown:

```markdown
* Add it to any text element
* Like list items, or headers.
* It adds some attention.

```



### Local auto-appear

With the option `autoappear` set to `false`, the above still works, but only on a data-attribute basis. ONLY elements in the presentation that are inside sections or fragments with a data-attribute of `data-autoappear` will be animated automatically, with the selectors and animations as described in the configuration: 

```javascript
Reveal.initialize({
	// ...
	appearance: {
		// ...
		autoappear: false,
		autoelements: {
			'ul li': 'animate__fadeInLeft',
			'ol li': 'animate__fadeInRight'
		}
	},
	plugins: [ Appearance ]
});
```

```html
<section data-autoappear="true">
	<ul>
		<li>This is list item 1</li>
		<li>This is list item 2</li>
	</ul>
</section>
```


### Local auto-appear, specified

You can also add a JSON object to the slide’s `data-autoappear`, with specific elements, their animations class(es) as a string or an object with animations class(es), optional speed and optional delay.  

In the example below you can see that mixing strings and objects is perfectly fine. The `ul li` has a simple string for only the animation class(es) while the `h3` uses an object with keys.

```html
<section data-autoappear='{"ul li":"animate__fadeInRight", 
"h3": {"animation":"animate__fadeInDown", "speed":"slow", "delay":"100"}}'>
	<h3>Local auto-appear, specified</h3>
	<ul>
		<li>This is list item 1</li>
		<li>This is list item 2</li>
	</ul>
</section>
```

## Configuration

There are a few options that you can change from the Reveal.js options. The values below are default and do not need to be set if they are not changed.

```javascript
Reveal.initialize({
  // ...
  appearance: {
    hideagain: true,
    delay: 300,
    appearevent: 'slidetransitionend',
    autoappear: false,
    autoelements: false,
    cssautoload: true,
    csspath: '',
    animatecsspath: {
      link : 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
      compat : 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.compat.css',
    },
    compatibility: false,
    compatibilitybaseclass: 'animated'
  },
  plugins: [ Appearance ]
});
```

* **`hideagain`**: Change this (true/false) if you want to see the shown elements if you go back.
* **`delay`**: Base time in ms between appearances.
* **`appearevent`**: Use a specific event at which Appearance starts.
* **`autoappear`**: Use this when you do not want to add classes to each item that you want to appear, and just let Appearance add animation classes to (all of) the provided elements in the presentation. See "Autoappear" mode above.
* **`autoelements`**: These are the elements that `autoappear` will target. Each element has a selector and an animation class. If `autoappear` is off, the elements will still get animation if the section contains a `data-autoappear` attribute.
* **`cssautoload`**: Appearance will load the CSS if this is set to `true`. If you import reveal.js-appearance from npm, you will need to import the CSS file yourself. If you use 'import', then csspath should be set to `false`. If you know the path to the CSS file, you can use the `csspath` option and keep cssautoload set to `true`.
* **`csspath`**: Appearance will automatically load the styling of the plugin. If you want to customise the styling, you can link to your own CSS file here.
* **`animatecsspath`**: Appearance will also automatically load the styling of Animate.css via a CDN. Note that Animate.css has two links, the first (CDN) one is for version 4, the second (old) one is the version 3 compatibility CDN link.
* **`compatibility`**: This setting can let you use your current markup. However, because this also uses the Animate.css compatibility CSS, and it is likely that they will not support this in the future, please update your markup as shown above.
* **`compatibilitybaseclass`**: This is the baseclass to use if you don't change your markup. 




## Migration guide
Appearance v1.1.2 was an update to stay current with the latest version of Animate.css, which itself brought breaking changes in version 4. Animate.css v4 added a prefix for all of the Animate.css classes, defaulting to `animate__` . Appearance will now automatically add the Animate.css base class (`animate__animated`) to any element with a Animate.css animation class.

You have two options to migrate to the new version:

### Adjust your markup

If in Appearance v1.1.1 you used this:

```html
<img class="animated fadeInDown" data-src="1.jpg">
```
 
you should now use this:

```html
<img class="animate__fadeInDown" data-src="1.jpg">
```
which is the only change in the markup. 


### Turn on compatibility mode

If you turn in compatibility mode in Appearance, you can keep using your current markup. However, because this also uses the Animate.css compatibility CSS, this might break your presentations in the future, so it is not recommended. See the options above for compatibility mode and the compatibility base class.



## Like it?
If you like it, please star this repo! 

And if you want to show off what you made with it, please do :-)


## License
MIT licensed

Copyright (C) 2023 Martijn De Jongh (Martino)