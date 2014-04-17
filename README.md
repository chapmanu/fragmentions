# Fragmentions

Fragmentions enable you to use ## double-hash anchors as links to individual words or phrases on in a document.

- [Google Chrome Extension](https://chrome.google.com/webstore/detail/fragmentions/pgajkeekgcmgglngchhmcmnkffnhihck)
- [Indie Web Camp Article](http://indiewebcamp.com/fragmention)


## Usage

Fragmentions finds the first matching word or phrase in a document and focuses its closest surrounding element. The match is determined by the case-sensitive string following the ## double-hash. The closest surrounding element may be a span, paragraph, heading, button, input, or any other container.

In the following example, clicking **TL;DR** would scroll to focus the `<strong>` element containing **Life, Liberty and the pursuit of Happiness**.

```html
<article>
	<p><a href="##pursuit">TL;DR</a></p>

	<p>When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature's God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation.</p>

	<p>We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are <strong>Life, Liberty and the pursuit of Happiness</strong>.</p>
</article>
```


## JavaScript polyfill

The [fragmention polyfill](https://github.com/chapmanu/fragmentions/blob/master/script.js) allows documents to respond to fragmentions. When a fragmention is detected, the document is searched for matching text. If and when a match is found, the window scrolls to and focuses on that element.

### Browser support

The fragmention polyfill has been successfully tested in desktop Chrome, Firefox, Safari, Opera, and Internet Explorer, as well as Firefox on Android and Safari on iOS. Legacy Internet Explorer 8 is also supported, but marked as deprecated.


## Chrome extension

The [fragmention extension](https://chrome.google.com/webstore/detail/fragmentions/pgajkeekgcmgglngchhmcmnkffnhihck) for Google Chrome allows documents to respond to fragmentions, duplicating the functionality of the JavaScript polyfill.


## Challenges

While most find the idea of fragmentions delightful, there are differing ideas on how they should work. We ask contributors to justify feature requests with concrete real world examples, as tests in the wild may reveal best practices. Otherwise, any of these challenges could be appended with, *“So, uh, what do you think?”*

### Double-hashes in the wild

The URL spec doesn't *allow* fragments to contain hash signs, so links like `<a href="##foo">` may fail validation. On the other hand, browsers *do* understand them, so links like `<a href="##foo">` may have two meanings.

The initial feedback is that few people concern themselves with hash fragment validation, and even less would (at least, knowingly) use them in this way.

### Sensitivity

Matching case is strict, but makes it easier to target specific text. Ignoring case is cavalier, but makes it easier to target anything.

The initial feedback is conflicting. Some expected fuzzy matching. Others expected specific matching. Most agreed that it depends on your specific use-cases, which are sorely lacking in most of the annotations discussions. And what about white space sensitivity?

### URL encoding

Fragmentions are decoded before search, which means `+` plus signs are interpreted as spaces or must be escaped (`%2B`). This makes for prettier, conforming URLs, but may also be confusing for users targeting phrases with special characters.


## Looks good to me

Thanks, now [test it yourself](https://github.com/chapmanu/fragmentions/blob/master/example.html), [give us feedback](https://github.com/chapmanu/fragmentions/issues), and have fun!
