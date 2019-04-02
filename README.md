# reveal.js-appearance
An animation plugin for Reveal.js


In Powerpoint you can make slides with items that appear automatically with effects. This plugin for Reveal.js tries to achieve the same result. It's easy to set up. It uses Animate.css by Daniel Eden for the animations, with some changes in a separate CSS file to allow for a non-animated state. 

[Demo](https://martinomagnifico.github.io/reveal.js-appearance/demo.html)

Because the animations need to be kicked in, we wait for the slide transition to end. Reveal.js has no "slidechangecomplete" event, so we need the transit.js plugin that handles the events. In a future version of Reveal.js we probably won't need Transit.js.



## Installation

Copy the appearance folder to the plugins folder of the reveal.js folder, like this: `plugin/appearance`. Now add it to the dependencies of Reveal.js:


```javascript
Reveal.initialize({
	// ...
	dependencies: [
		// ... 
		{ src: 'assets/js/revealjs/plugin/transit/transit.js', async: false },
		{ src: 'assets/js/revealjs/plugin/appearance/appearance.js', async: false }
		// ... 
	]
});
```
Now copy the appearance.css file and make a reference to it. Note that this example has an "assets" folder for resources. You can use whatever setup for the hierarchy, as long as the references are correct :-)

```html
<link rel="stylesheet" href="assets/css/appearance.css">
```



## Setup

It is easy to set up your HTML structure for Appearance.js: 

```html
<ul>
	<li class="animated bounceInLeft">Add it to any text element</li>
	<li class="animated bounceInLeft">Like list items, or headers.</li>
	<li class="animated bounceInLeft">It adds some attention.</li>
</ul>
```


## Configuration

There are a few options that you can change from the Reveal.js options. The values below are default and do not need to be set if they are not changed.

```javascript
Reveal.initialize({
	// ...
	appearance: {
		// The baseclass uses the baseclass from Animate.css. Change it if you like
		baseclass: 'animated',
		// Use a specific class for the visible state.
		visibleclass: 'in',
		// Change this if you want to see the shown elements if you go back
		hideagain: true,
		// Base time between appearances
		delay: 300
		
	},
	dependencies: [
	// ... 
	]
});
```


## Now change it

It is easy to change the effects for Appearance.js. Here's how to change the delay per-element: 

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
This is my second Github repo... let me know if you like it.


## License
MIT licensed

Copyright (C) 2019 Martijn De Jongh (Martino)
