<!-- .slide: data-initdelay="300" -->
# Appearance <!-- .element: class="animate__flipInX animate__slow" -->
### for Reveal.js <!-- .element: class="animate__fadeInDown faster" data-split="letters" data-delay="75", data-container-delay="700" -->

![](assets/img/1.jpg) <!-- .element: class="animate__shrinkIn demoimg smallcircle" data-delay="800" -->
![](assets/img/2.jpg) <!-- .element: class="animate__shrinkIn demoimg smallcircle" data-delay="220" -->
![](assets/img/3.jpg) <!-- .element: class="animate__shrinkIn demoimg smallcircle" data-delay="200" -->
![](assets/img/4.jpg) <!-- .element: class="animate__shrinkIn demoimg smallcircle" data-delay="180" -->
![](assets/img/5.jpg) <!-- .element: class="animate__shrinkIn demoimg smallcircle" data-delay="160" -->
<!-- .element: class="row fivegrid smallcircles" -->

Using Markdown <!-- .element: class="animate__flipInX animate__slow" -->

---

## Why?

----

In Powerpoint you can make slides with items that appear automatically with effects. This plugin for Reveal.js tries to achieve the same result.
<!-- .element: class="small" -->

Appearance is easy to set up. It uses [Animate.css](https://animate.style) by Daniel Eden for the animations, with some changes to allow for a non-animated state.
<!-- .element: class="small" -->

---

## Examples
Let's check out what Appearance does:

----

## Let text appear

* Add it to any text element <!-- .element: class="animate__bounceInLeft" -->
* Like list items, or headers. <!-- .element: class="animate__bounceInLeft" -->
* It adds some impact. <!-- .element: class="animate__bounceInLeft" -->

----

### Let lines appear per word<!-- .element: class="animate__fadeInDown animate__faster" data-split="words" data-delay="200" -->
### or…<!-- .element: class="animate__fadeInDown" -->
### per character<!-- .element: class="animate__fadeInDown animate__faster" data-split="letters" data-delay="75", data-container-delay="700" -->

----

## Let images appear

![](assets/img/1.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/2.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/3.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/4.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/5.jpg) <!-- .element: class="animate__flipInX demoimg" -->
<!-- .element: class="row fivegrid" -->

----

## Use with fragments

Inside fragments like this *(click next)<!-- .element: class="animate__fadeInDown animate__faster" -->*:
<!-- .element: class="animate__fadeInDown" -->

![](assets/img/1.jpg) <!-- .element: class="animate__fadeInDown demoimg" -->
![](assets/img/2.jpg) <!-- .element: class="animate__fadeInDown demoimg" -->
![](assets/img/3.jpg) <!-- .element: class="animate__fadeInDown demoimg" -->
![](assets/img/4.jpg) <!-- .element: class="animate__fadeInDown demoimg" -->
![](assets/img/5.jpg) <!-- .element: class="animate__fadeInDown demoimg" -->
<!-- .element: class="fragment row fivegrid" -->

Or as a fragment itself.
<!-- .element: class="fragment animate__fadeInDown" -->

---

## Setup

----

## Basics
There are really only three steps:

1. Install Appearance <!-- .element: class="animate__fadeInLeft" -->
2. Edit the markup to add animation classes <!-- .element: class="animate__fadeInLeft" -->
3. Enjoy the animations <!-- .element: class="animate__fadeInLeft" -->

----

### Javascript
Load the script and make a reference to it in the Reveal plugin options: <!-- .element: class="small" -->

```html []
<script src="plugin/appearance/appearance.js"></script>
<script>
  Reveal.initialize({
    plugins: [ Appearance ]
  });
</script>
```

----

### Markup (automatic or manual)

For *automatic markup*, you can use the [`autoappear`](#autoappear) option.
<!-- .element: class="small" -->

For *manual markup*, continue to the next slide.
<!-- .element: class="small" -->


----

### Markup (manual)

Add an animation class to the elements that you would like to have animated when the slide appears:
<!-- .element: class="small" -->

```html []
![](assets/img/1.jpg) <!-- .element: class="animate__fadeInDown" -->
![](assets/img/2.jpg) <!-- .element: class="animate__fadeInDown" -->
```

Check the [regular HTML demo](demo.html) to see how you do this in HTML. A Quarto extension can be found [here](https://github.com/Martinomagnifico/quarto-appearance).
<!-- .element: class="small" -->

----

### Markup (manual) for words or letters

Add an animation class to the sentence or word that you want to split into its parts, and add a data-attribute for the kind of split you want:
<!-- .element: class="small" -->

```html []
### Split into words<!-- .element: class="animate__fadeInDown" data-split="words" -->
### Split into letters<!-- .element: class="animate__fadeInDown" data-split="letters" -->
```



---

## Now change it
You can change the delay, speed and start of animations easily:

----

### Change the delay

Use<!-- .element: class="small" --> `data-delay="*"`<!-- .element: class="small" --> on each element, where the wildcard is the delay in microseconds from the appearance of the previous element.<!-- .element: class="small" -->

![](assets/img/1.jpg) <!-- .element: class="animate__fadeInDown demoimg" data-delay="0" -->
![](assets/img/2.jpg) <!-- .element: class="animate__fadeInDown demoimg" data-delay="200" -->
![](assets/img/3.jpg) <!-- .element: class="animate__fadeInDown demoimg" data-delay="160" -->
![](assets/img/4.jpg) <!-- .element: class="animate__fadeInDown demoimg" data-delay="120" -->
![](assets/img/5.jpg) <!-- .element: class="animate__fadeInDown demoimg" data-delay="80" -->
<!-- .element: class="row fivegrid" -->


```html []
![](assets/img/1.jpg) <!-- .element: class="animate__fadeInDown" data-delay="0" -->
![](assets/img/2.jpg) <!-- .element: class="animate__fadeInDown" data-delay="200" -->
![](assets/img/3.jpg) <!-- .element: class="animate__fadeInDown" data-delay="160" -->
![](assets/img/4.jpg) <!-- .element: class="animate__fadeInDown" data-delay="120" -->
![](assets/img/5.jpg) <!-- .element: class="animate__fadeInDown" data-delay="80" -->
```

`data-delay` is automatically converted to CSS animation delay.
<!-- .element: class="small" -->


----
<!-- .slide: class="test" -->

### Change the animation speed

Use the speed classes from Animate.css to change the speed of the animation:<!-- .element: class="small" --> 

`animate__slower`<!-- .element: class="small animate__fadeIn" style="font-size: 0.4em;" data-delay="50ms"-->
`animate__slow`<!-- .element: class="small animate__fadeIn" style="font-size: 0.4em;" data-delay="50ms"-->
&nbsp;<!-- .element: class="small animate__fadeIn" style="font-size: 0.4em;" data-delay="50ms"-->
`animate__fast`<!-- .element: class="small animate__fadeIn" style="font-size: 0.4em;" data-delay="50ms"-->
`animate__faster`<!-- .element: class="small animate__fadeIn" style="font-size: 0.4em;" data-delay="50ms"-->
<!-- .element: class="row fivegrid" -->

![](assets/img/1.jpg) <!-- .element: class="animate__bounceIn demoimg animate__slower" -->
![](assets/img/2.jpg) <!-- .element: class="animate__bounceIn demoimg animate__slow" -->
![](assets/img/3.jpg) <!-- .element: class="animate__bounceIn demoimg" -->
![](assets/img/4.jpg) <!-- .element: class="animate__bounceIn demoimg animate__fast" -->
![](assets/img/5.jpg) <!-- .element: class="animate__bounceIn demoimg animate__faster" -->
<!-- .element: class="row fivegrid" -->


```html []
![](assets/img/1.jpg) <!-- .element: class="animate__bounceIn animate__slower" -->
![](assets/img/2.jpg) <!-- .element: class="animate__bounceIn animate__slow" -->
![](assets/img/3.jpg) <!-- .element: class="animate__bounceIn" -->
![](assets/img/4.jpg) <!-- .element: class="animate__bounceIn animate__fast" -->
![](assets/img/5.jpg) <!-- .element: class="animate__bounceIn animate__faster" -->
```




----

### Change the settings for words or letters

For words and letters, just set the speed and delay as described above. The smaller parts will inherit these settings. Set a `data-container-delay="*"` for a different delay for the container, compared to the standard `delay = 300` from the options. Add a `baseline` class for a nice baseline effect.
<!-- .element: class="small" --> 

### Split into words <!-- .element: class="animate__fadeInUp baseline" data-split="words" -->
### Split into letters <!-- .element: class="animate__fadeInUp animate__faster" data-split="letters" data-delay="75" data-container-delay="800" --> 

```html []
### Split into words <!-- .element: class="animate__fadeInUp baseline" data-split="words" -->
### Split into letters <!-- .element: class="animate__fadeInUp animate__faster" data-split="letters" data-delay="75" data-container-delay="800" --> 
```

----
<!-- .slide: data-auto-animate -->
### Change when Appearance starts

----
<!-- .slide: data-auto-animate data-appearevent="auto" -->
### Change when Appearance starts

You can use any of the following events:
<!-- .element: class="animate__fadeInUp" -->

* *slidetransitionend* (default, after the transition)
* *slidechanged* (with the transition)
* *auto* (with transition, on autoanimate slides)

```html []
---- (or any other slide separator)
<!-- .slide: data-appearevent="auto" -->
```

This can be set per-slide with `data-appearevent`, or globally in the Appearance options.
<!-- .element: class="small animate__fadeInUp " -->


----
<!-- .slide: data-initdelay="3000" -->
### Change the initial delay

This delay is triggered when a slide is loaded/reloaded for the first time.
<!-- .element: class="small" -->

When you came to this slide, you probably came from the previous slide so the initial delay was NOT applied. Reload your browser to see the effect. The images will then only appear after 3 seconds.
<!-- .element: class="small" -->

![](assets/img/1.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/2.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/3.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/4.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/5.jpg) <!-- .element: class="animate__flipInX demoimg" -->
<!-- .element: class="row fivegrid" -->

```html []
---- (or any other slide separator)
<!-- .slide: data-initdelay="3000" -->
```

This can also be set globally in the Appearance options.
<!-- .element: class="small" -->

---

## Autoappear
You can simplify the addition of animation classes:

----


Sometimes (for example with Markdown), adding classes to elements is a chore.
<!-- .element: class="small" -->

Appearance can automatically add animation classes to specific elements (tags or other selectors) in the presentation (with the option `autoappear`) or per slide (with `data-autoappear`).
<!-- .element: class="small" -->

----

### Global autoappear mode
* This is list item 1
* This is list item 2

```html []
### Global autoappear mode
* This is list item 1
* This is list item 2
```

```js [3-6]
Reveal.initialize({
  //...
  appearance: {
    autoappear: true,
    autoelements: {"ul li": "animate__fadeInLeft"}
  },
  //...
```

You can use a simple object, or more elaborate like this: `'{"ul li": {"animation":"animate__fadeInLeft", "speed":"slow", "delay":"100"}}'`.
<!-- .element: class="small" -->

----

### Local auto-appear
<!-- .slide: data-autoappear="true" -->

This will use the object (or JSON string) from the global autoelements option, even if autoappear is false.
<!-- .element: class="small" -->

* This is list item 1

```html []
<!-- .slide: data-autoappear="true" -->
### Local auto-appear
* This is list item 1
```

```js [4-5]
Reveal.initialize({
  //...
  appearance: {
    autoappear: false,
    autoelements: {"ul li": "animate__fadeInLeft"}
  },
  //...
```



----

<!-- .slide: data-autoappear="{'ul li':'animate__fadeInRight', 'h3': {'animation':'animate__fadeInDown', 'speed':'slow'}}" -->

### Local auto-appear, specified

You can also add JSON to the slide’s autoappear data-attribute, with elements, their animations class(es) as a string or an object with animations class(es), optional speed and optional delay.
<!-- .element: class="small" -->

* This is a list item

```html []
<!-- .slide: data-autoappear="{'ul li':'animate__fadeInRight', 'h3': {'animation':'animate__fadeInDown', 'speed':'slow'}}" -->
### Local auto-appear, specified
* This is a list item
```

Appearance lets you use single quotes in JSON even though not valid: `data-autoappear="{'ul li':'animate__fadeInRight'}"`. This is because Reveal-Markdown only allows double quotes for its data-attributes (encoding your double quotes is also good, but that is a lot more work).
<!-- .element: class="small" -->


----

<!-- .slide: data-autoappear="{'h3': {'animation':'animate__fadeInDown', 'speed':'fast', 'delay':'180', 'split':'words', 'container-delay':'200ms'}, 'h4': {'animation':'animate__fadeInUp baseline', 'split':'letters', 'delay':'80'}}" -->

### Local auto-appear, specified and split

And you can do the same for any animations that you would like to have on lines and words.<!-- .element: class="small" -->

#### Appearance

```html []
<!-- .slide: data-autoappear="{'h3': {'animation':'animate__fadeInDown', 'speed':'fast', 'delay':'180', 'split':'words', 'container-delay':'200ms'}, 'h4': {'animation':'animate__fadeInUp baseline', 'split':'letters', 'delay':'80'}}" -->
### Local auto-appear, specified and split
#### Appearance
```

---

## Options
See the [regular HTML demo](demo.html#options) for details how to set the global options.