# Appearance <!-- .element: class="animate__flipInX slow" -->
### for Reveal.js <!-- .element: class="animate__flipInX slow" -->

Using Markdown <!-- .element: class="animate__flipInX slow" -->

---

## Why?

----

In Powerpoint you can make slides with items that appear automatically and sequentially with effects. Appearance is a plugin for Reveal.js that does the same.

Appearance is easy to set up. It uses [Animate.css](https://animate.style) by Daniel Eden for the animations, with some changes to allow for a non-animated state.

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

## Let images appear

![](img/1.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](img/2.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](img/3.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](img/4.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](img/5.jpg) <!-- .element: class="animate__flipInX demoimg" -->

```html []
![](img/1.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](img/2.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](img/3.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](img/4.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](img/5.jpg) <!-- .element: class="animate__flipInX demoimg" -->
```

----

## Inside fragments

Like this *(click next)<!-- .element: class="animate__fadeInDown animate__faster" -->*:
<!-- .element: class="animate__fadeInDown" -->

![](img/1.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](img/2.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](img/3.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](img/4.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](img/5.jpg) <!-- .element: class="animate__flipInX demoimg" -->
<!-- .element: class="fragment" -->

```html []
![](img/1.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](img/2.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](img/3.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](img/4.jpg) <!-- .element: class="animate__flipInX demoimg" -->
![](img/5.jpg) <!-- .element: class="animate__flipInX demoimg" -->
<!-- .element: class="fragment" -->
```

---

## Auto-appear
You can simplify the addition of animation classes:

----


Sometimes (for example with Markdown), adding classes to elements is a chore. 

Appearance can automatically add animation classes to specific elements (tags or other selectors) in the presentation (with the option `autoappear`) or per slide (with `data-autoappear`).

----

### Global auto-appear mode
* This is list item 1
* This is list item 2

```html []
### Global auto-appear mode
* This is list item 1
* This is list item 2
```

```html []
<script>
	//...
	appearance: {
		autoappear: true,
		autoelements: {'ul li': 'animate__fadeInLeft'}
	},
	plugins: [ RevealMarkdown, Appearance ]
</script>
```

This shows how to globally set elements to appear.<!-- .element: class="small" -->

----

### Local auto-appear
<!-- .slide: data-autoappear="true" -->
* This is list item 1
* This is list item 2

```html []
<!-- .slide: data-autoappear="true" -->
### Local auto-appear
* This is list item 1
* This is list item 2
```

```html []
<script>
	//...
	appearance: {
		autoappear: false,
		autoelements: {'ul li': 'animate__fadeInLeft'}
	},
	plugins: [ RevealMarkdown, Appearance ]
</script>
```

Local auto-appear uses a data-attribute per slide.<!-- .element: class="small" -->

----

<!-- .slide: data-autoappear="{'ul li':'animate__fadeInRight','h3':['animate__fadeInDown, animate__slow','100ms']}" -->
### Local auto-appear, specified

You can also add a JSON object to the slide’s auto-appear data-attribute, with specific elements, their animations class/classes and optional delay.<!-- .element: class="small" -->

* This is list item 1
* This is list item 2

```html []
<!-- .slide: data-autoappear="{'ul li':'animate__fadeInRight','h3':['animate__fadeInDown, animate__slow','100ms']}" -->
### Local auto-appear, specified
* This is list item 1
* This is list item 2
```
