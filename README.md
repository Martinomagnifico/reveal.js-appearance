# Appearance

[![Version](https://img.shields.io/npm/v/reveal.js-appearance)](#) [![Downloads](https://img.shields.io/npm/dt/reveal.js-appearance)](https://github.com/Martinomagnifico/reveal.js-appearance/archive/refs/heads/master.zip)

A plugin for [Reveal.js](https://revealjs.com) 4 that adds appearance effects to elements.

[![Screenshot](https://martinomagnifico.github.io/reveal.js-appearance/screenshot.png)](https://martinomagnifico.github.io/reveal.js-appearance/demo.html)

In Powerpoint you can make slides with items that appear automatically with effects. This plugin for Reveal.js tries to achieve the same result. It's easy to set up. It uses Animate.css by Daniel Eden for the animations, with some changes in a separate CSS file to allow for a non-animated state. 

[Demo](https://martinomagnifico.github.io/reveal.js-appearance/demo.html)

We do not want the animations to start during the slide transition, so we wait for the slide transition to end. Then the animations will start automatically if the HTML is set up to use Appearance.

Version 1.1.1 adds an `autoappear` mode for use in cases where adding animation classes is too much of a hassle, like inside Markdown.



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

You now need to add TWO stylesheets to your presentation. 

* The first one is Animate.css by Daniel Eden for the basic animations, and we can add it through a CDN.
* The second file is included with Appearance. It adds to the first stylesheet to allow for a non-animated state.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
<link rel="stylesheet" href="plugin/appearance/appearance.css">
```



### HTML

It is easy to set up your HTML structure for Appearance: 

```html
<ul>
	<li class="animated bounceInLeft">Add it to any text element</li>
	<li class="animated bounceInLeft">Like list items, or headers.</li>
	<li class="animated bounceInLeft">It adds some attention.</li>
</ul>
```
When you are working with Markdown, this can be a chore so if you do not want to add all these classes, you can set the option `autoappear` to `true` (see Configuration below) and let Appearance do the heavy work. You do not need to add any markup and it will stay like this:

```html
<ul>
	<li>Add it to any text element</li>
	<li>Like list items, or headers.</li>
	<li>It adds some attention.</li>
</ul>
```
or this:

```markdown
* Add it to any text element
* Like list items, or headers.
* It adds some attention.

```

Another usecase is when you have dynamic items that are inserted, for example, when you generate a Table Of Contents automatically with the [Simplemenu](https://martinomagnifico.github.io/reveal.js-simplemenu) plugin, you can now animate those as well.


## Configuration

There are a few options that you can change from the Reveal.js options. The values below are default and do not need to be set if they are not changed.

```javascript
Reveal.initialize({
	// ...
	appearance: {
		baseclass: 'animated',
		visibleclass: 'in',
		hideagain: true,
		delay: 300,
		appearevent: 'slidetransitionend',
		autoappear: false,
		autoelements: false
	},
	plugins: [ Appearance ]
});
```

* **`baseclass`**: The baseclass uses the baseclass from Animate.css. Change it if you like. 
* **`visibleclass`**: Use a specific class for the visible state. 
* **`hideagain`**: Change this (true/false) if you want to see the shown elements if you go back.
* **`delay`**: Base time in ms between appearances.
* **`appearevent`**: Use a specific event at which Appearance starts.
* **`autoappear`**: Use this when you do not want to add classes to each item that you want to appear, and just let Appearance add animation classes to (all of) the provided elements in the presentation. See "Using 'autoappear'" mode below.
* **`autoelements`**: These are the elements that `autoappear` will target. Each element has a selector and an animation class. If `autoappear` is off, the elements will still get animation if the section contains a `data-autoappear` attribute.


### Changing the 'appearevent'
When you navigate from slide to slide, you can set transition effects in Reveal. These effects take some time. That's why, by default, Appearance only starts when the slide transition has ended. 

There are cases however, where  there is hardly any transition, for example, when going from an autoanimate slide to another. Reveal then suppresses the user-set transition to a short opacity change. Starting *together with* the transition might then be nicer. You can use any of the following events:

* *slidetransitionend* (default, Appearance will start animating elements after the transition)
* *slidechanged* (Appearance will start together with the transition)
* *auto* (Appearance will start together with the transition, but only on autoanimate slides, other slides will use *slidetransitionend*) 

These same event triggers can be set through the data-attribute `data-appearevent`. 

When using Appearance inside an autoanimate slide, and changing the appearevent to `slidechanged` or `auto`, keep in mind that Reveal transforms opacity for all non-autoanimate items, while Appearance does the same on most of the effects. To avoid strange behaviour, wrap these Appearance items in a parent. For example, a list of animated bullet points works well, because the animated class is on the children, not the parent. Separate headings or other elements do not have that, so should be wrapped.


### Using 'autoappear' mode
Sometimes (for example with Markdown), adding classes to elements is a chore. Appearance can automatically add animation classes to specific elements in the presentation.

With the option `autoappear` set to `true`, ALL elements in the presentation that have a certain selector (and that are not already classed with your base animation class, like 'animated') will get subsequently get this class, and thus an animation. These selectors and the animations can be set in the configuration options like this: 

```javascript
autoelements: {
	'ul li': 'fadeInLeft',
	'ol li': 'fadeInRight'
}
```
You can add any selector and animation class to this object.

With the option `autoappear` set to `false`, the above still works, but only on a data-attribute basis. ONLY elements in the presentation that are inside sections or fragments with a data-attribute of `data-autoappear` will be animated automatically. 



## Now change it

It is easy to change the effects for Appearance. Here's how to change the delay per-element: 

```html
<img class="animated fadeInDown" data-src="1.jpg" data-delay="200">
<img class="animated fadeInDown" data-src="2.jpg" data-delay="160">
<img class="animated fadeInDown" data-src="3.jpg" data-delay="120">
```
or the speed of each animation, using the tempo classes from Animate.css:

```html
<img class="animated fadeInDown slower" data-src="1.jpg">
<img class="animated fadeInDown slow" data-src="2.jpg">
<img class="animated fadeInDown fast" data-src="3.jpg">
<img class="animated fadeInDown faster" data-src="4.jpg">
```

## Like it?
If you like it, please star this repo! 

And if you want to show off what you made with it, please do :-)


## License
MIT licensed

Copyright (C) 2021 Martijn De Jongh (Martino)
