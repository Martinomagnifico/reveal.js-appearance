<!-- .slide: data-init-delay="300" -->
# Appearance <!-- .element: class="animate__flipInX animate__slow" -->
### for Reveal.js <!-- .element: class="animate__fadeInDown faster" data-split="letters" data-delay="75", data-container-delay="700" -->

![](assets/img/1.jpg) <!-- .element: class="animate__shrinkIn demoimg smallcircle" data-delay="1200" -->
![](assets/img/2.jpg) <!-- .element: class="animate__shrinkIn demoimg smallcircle" data-delay="220" -->
![](assets/img/3.jpg) <!-- .element: class="animate__shrinkIn demoimg smallcircle" data-delay="200" -->
![](assets/img/4.jpg) <!-- .element: class="animate__shrinkIn demoimg smallcircle" data-delay="180" -->
![](assets/img/5.jpg) <!-- .element: class="animate__shrinkIn demoimg smallcircle" data-delay="160" -->

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


```html []
* Add it to any text element <!-- .element: class="animate__bounceInLeft" -->
* Like list items, or headers. <!-- .element: class="animate__bounceInLeft" -->
* It adds some impact. <!-- .element: class="animate__bounceInLeft" -->
```

----

### Let lines appear per word<!-- .element: class="animate__fadeInDown animate__faster" data-split="words" data-delay="200" -->
### or…<!-- .element: class="animate__fadeInDown" -->
### per character<!-- .element: class="animate__fadeInDown animate__faster" data-split="letters" data-delay="75", data-container-delay="700" -->


```html []
### Let lines appear per word<!-- .element: class="animate__fadeInDown animate__faster" data-split="words" data-delay="200" -->
### or…<!-- .element: class="animate__fadeInDown" -->
### per character<!-- .element: class="animate__fadeInDown animate__faster" data-split="letters" data-delay="75", data-container-delay="700" -->
```

----

## Let images appear

![](assets/img/1.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/2.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/3.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/4.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/5.jpg) <!-- .element: class="animate__flipInX demoimg" -->

```html []
![](assets/img/1.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/2.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/3.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/4.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/5.jpg) <!-- .element: class="animate__flipInX demoimg" -->
```

----

## Use with fragments

Inside fragments like this *(click next)<!-- .element: class="animate__fadeInDown animate__faster" -->*:
<!-- .element: class="animate__fadeInDown" -->

![](assets/img/1.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/2.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/3.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/4.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/5.jpg) <!-- .element: class="animate__flipInX demoimg" -->
<!-- .element: class="fragment" -->

```html []
![](assets/img/1.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/2.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/3.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/4.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](assets/img/5.jpg) <!-- .element: class="animate__flipInX demoimg" -->
<!-- .element: class="fragment" -->
```

Or as a fragment itself.
<!-- .element: class="fragment animate__fadeInDown" -->

---

## Autoappear
You can simplify the addition of animation classes:

----


Sometimes (for example with Markdown), adding classes to elements is a chore. <!-- .element: class="small" -->

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
    autoelements: {'ul li': 'animate__fadeInLeft'}
  },
  //...
```

You can use a simple JSON object, or more elaborate like this:<!-- .element: class="small" -->
`'{"ul li": {"animation":"animate__fadeInLeft", "speed":"slow", "delay":"100"}}'`.<!-- .element: class="small" -->

----

### Local auto-appear
<!-- .slide: data-autoappear="true" -->

This will use the JSON object from the global autoelements option, even if autoappear is false.<!-- .element: class="small" -->

* This is list item 1

```html []
<!-- .slide: data-autoappear="true" -->
### Local auto-appear
* This is list item 1
```

```html []
<script>
	//...
	appearance: {
		autoappear: false,
		autoelements: {"ul li": "animate__fadeInLeft"}
	},
	plugins: [ RevealMarkdown, Appearance ]
</script>
```



----

<!-- .slide: data-autoappear="{'ul li':'animate__fadeInRight', 'h3': {'animation':'animate__fadeInDown', 'speed':'slow', 'delay':'100'}}" -->

### Local auto-appear, specified

You can also add a JSON object to the slide’s auto-appear data-attribute, with specific elements, their animations class(es) a string or an object with animations class(es), optional speed and optional delay.<!-- .element: class="small" -->

IMPORTANT: Reveal Markdown expects data attributes to use double quotes, so using JSON (also double quotes) inside it would break things. Appearance allows you to use single quotes.<!-- .element: class="small" -->

* This is list item 1
* This is list item 2

```html []
<!-- .slide: data-autoappear="{'ul li':'animate__fadeInRight', 'h3': {'animation':'animate__fadeInDown', 'speed':'slow', 'delay':'100'}}" -->
### Local auto-appear, specified
* This is list item 1
* This is list item 2
```

----

<!-- .slide: data-autoappear="{'h3': {'animation':'animate__fadeInDown', 'speed':'fast', 'delay':'180', 'split':'words', 'container-delay':'500ms'}, 'h4': {'animation':'animate__fadeInDown', 'split':'letters', 'delay':'80'}}" -->

### Local auto-appear, specified and split

And you can do the same for any animations that you would like to have on lines and words.<!-- .element: class="small" -->

#### Appearance

```html []
<!-- .slide: data-autoappear="{'h3': {'animation':'animate__fadeInDown', 'speed':'fast', 'delay':'180', 'split':'words', 'container-delay':'500ms'}, 'h4': {'animation':'animate__fadeInDown', 'split':'letters', 'delay':'80'}}" -->
### Local auto-appear, specified and split
#### Appearance
```