# Appearance

[![Version](https://img.shields.io/npm/v/reveal.js-appearance)](#) [![Downloads](https://img.shields.io/npm/dt/reveal.js-appearance)](https://github.com/Martinomagnifico/reveal.js-appearance/archive/refs/heads/master.zip)

An animation plugin for [Reveal.js](https://revealjs.com) that animates elements sequentially like in Powerpoint. Perfect for online portfolios or other presentations with images.

[<img src="https://martinomagnifico.github.io/reveal.js-appearance/screenshot.png" width="100%">](https://martinomagnifico.github.io/reveal.js-appearance/demo/demo.html)

In Powerpoint you can make slides with items that appear automatically with effects. This plugin for Reveal.js tries to achieve the same result. It's easy to set up. It uses Animate.css by Daniel Eden for the animations, with some changes to allow for a non-animated state. 

* [Demo](https://martinomagnifico.github.io/reveal.js-appearance/demo/demo.html)
* [Markdown demo](https://martinomagnifico.github.io/reveal.js-appearance/demo/demo-markdown.html)

The animations will start automatically after or at each slide or fragment change if the HTML is set up to use Appearance.


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



## Adding Appearance to your presentation

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


#### From npm

You can run it directly from npm:

```html
<script type="module">
	import Reveal from 'reveal.js';
	import Appearance from 'reveal.js-appearance';
	import 'reveal.js-appearance/plugin/appearance/appearance.css';
	Reveal.initialize({
		// ...
		plugins: [ Appearance ]
	});
</script>
```

Otherwise, you may want to copy the plugin into a plugin folder or an other location::

```html
<script type="module">
	import Reveal from './dist/reveal.mjs';
	import Appearance from './plugin/appearance/appearance.mjs';
	import './plugin/appearance/appearance.css';
	Reveal.initialize({
		// ...
		plugins: [ Appearance ]
	});
</script>
```


### Styling
The styling of Appearance is automatically inserted **when the appearance folder is manually copied** to the Reveal.js plugin folder.

If you **import** reveal.js-appearance from npm, you will need to **import** the CSS file yourself. Depending on your setup this can be something like this:
```javascript
import 'reveal.js-appearance/plugin/appearance/appearance.css';
```

Appearance will detect if it runs in a module environment and will then not autoload the CSS. You can still set `cssautoload` to `true` if you like, but your bundler (Vite, Webpack) may not like that. In any of these cases, `import` the CSS file yourself.

If you want to change the Appearance style, you can do a lot of that via the Reveal.js options. Or you can simply make your own style and use that stylesheet instead. Linking to your custom styles can be managed through the `csspath` option of Appearance or through `import` when using modules.

#### Custom CSS
If and when you decide to create your own CSS file, make sure that you also include the following CSS variable, that is used by the plugin to avoid loading the CSS multiple times, and to avoid using the autoloading feature when using modules:

```css
:root {
	--cssimported-appearance: true;
}
```

## Setup

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
<h3 class="animate__fadeInDown" data-split="words">Let words appear word by word</h3>
<h3 class="animate__fadeInDown" data-split="letters">Let letters appear letter by letter</h3>
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
	data-container-delay="600">Let words appear word by word</h3>
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


### Initial delay on page load
You can set a delay before animations start, but only on the initial page load or reloads (not when navigating between slides):

<section data-init-delay="2000">
	<h3>Welcome</h3>
	<p class="animate__fadeIn">This will appear 2 seconds after page load</p>
</section>
```




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

* **animation**: The Animate.css animation class
* **speed**: Animation speed (slower, slow, fast, faster)
* **delay**: Delay between elements in milliseconds
* **initial-delay**: Delay before the first element of this type appears in milliseconds
* * **container-delay**: Delay before the first element in each container (when elements are in separate parent containers)
* **split**: Split text into words (`data-split="words"`) or letters (`data-split="letters"`) for individual animation

where the last key is specific for word- and letter-animations.

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

### Container-aware delays

When you have multiple groups of elements in separate containers, `container-delay` applies to the first element in each container, while `delay` applies between elements within the same container. In the example below, the `delay` is the standard 300ms from the global options.

```html
<section data-autoappear='{"img.test": {"animation":"animate__fadeInDown", "container-delay":"1200"}}'>
	<h3>Container-aware delays</h3>
	<div class="row">
		<img class="test" src="assets/img/1.jpg">
		... other images ...
	</div>
</section>
```





## Global options

There are a few options that you can change from the Reveal.js options. The values below, in alphabetical order, are default and do not need to be set if they are not changed. Some of the options have been removed, compared to the previous version. This is mainly because we now auto-import Animate.css, so no need to set that up anymore.

```javascript
Reveal.initialize({
  // ...
  appearance: {
	appearevent: 'slidetransitionend',
	autoappear: false,
	autoelements: false,
	cssautoload: true,
	csspath: '',
	delay: 300,
	hideagain: true,
	initdelay: 0
  },
  plugins: [ Appearance ]
});
```

* **`appearevent`**: Use a specific event at which Appearance starts. Options: `'slidetransitionend'` (default), `'slidechanged'`, or `'auto'`.
* **`autoappear`**: Use this when you do not want to add classes to each item that you want to appear, and just let Appearance add animation classes to (all of) the provided elements in the presentation. See "Autoappear" mode above.
* **`autoelements`**: These are the elements that `autoappear` will target. Each element has a selector and an animation class. If `autoappear` is off, the elements will still get animation if the section contains a `data-autoappear` attribute.
* **`cssautoload`**: Appearance will load the CSS (including Animate.css) if this is set to `true`. If you import reveal.js-appearance from npm, you will need to import the CSS file yourself. If you use 'import', then `cssautoload` should be set to `false`. If you know the path to the CSS file, you can use the `csspath` option and keep `cssautoload` set to `true`.
* **`csspath`**: Appearance will automatically load the styling of the plugin. If you want to customise the styling, you can link to your own CSS file here.
* **`delay`**: Base time in milliseconds between element appearances. This is the delay between items of the same type.
* **`hideagain`**: Change this (true/false) if you want to see the shown elements if you go back. When set to `true`, elements will hide again when navigating away from the slide.
* **`initdelay`**: Sets a delay in milliseconds before any animations start, but only on the initial page load (not when navigating between slides). Default is `0` (no delay). Can be overridden per-slide with `data-init-delay` attribute.





## Like it?
If you like it, please star this repo! 

And if you want to show off what you made with it, please do :smiley:


## License
MIT licensed

Copyright (C) 2026 Martijn De Jongh (Martino)