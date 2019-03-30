# reveal.js-appearance
An animation plugin for Reveal.js


In Powerpoint you can make slides with items that appear automatically with effects. This plugin for Reveal.js tries to achieve the same result. It's easy to set up. It uses Animate.css by Daniel Eden for the animations, with some changes in a separate CSS file to allow for a non-animated state. 

[Demo](https://martinomagnifico.github.io/reveal.js-appearance/demo.html)

Because the animations need to be kicked in, we wait for the slide transition to end. Reveal.js has no "slidechanged" event, so a listener for 'transitionend' is used. Pull requests are gladly accepted (my js is not so good).



## Installation

Copy the appearance folder to the plugins folder of the reveal.js folder, like this: `plugin/appearance`. Now add it to the dependencies of Reveal.js:


```javascript
Reveal.initialize({
	// ...
	dependencies: [
		// ... 
		{ src: 'plugin/appearance/appearance.js' },
		// ... 
	]
});
```
Also, copy the appearance.css file and make a reference to it:
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

## Like it?
This is my second Github repo... let me know if you like it.


## License
MIT licensed

Copyright (C) 2019 Martijn De Jongh
