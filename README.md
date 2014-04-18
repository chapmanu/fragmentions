# Fragmentions

Fragmentions are anchors to individual words or phrases in a document.

```html
<a href="##this+specific+text+">Find this specific text</a>
```

- [Google Chrome Extension](https://chrome.google.com/webstore/detail/fragmentions/pgajkeekgcmgglngchhmcmnkffnhihck)
- [Indie Web Camp Article](http://indiewebcamp.com/fragmention)



## Usage

Fragmentions use **##** double-hash changes to match words or phrases in a document, jumping to their corresponding element. Matches are case-sensitive and whitespace-insensitive. Corresponding elements may be spans, paragraphs, headings, buttons, inputs, or any other container element.

In the following example, clicking **TL;DR** would jump to the `<strong>` element containing **Life, Liberty and the pursuit of Happiness**.

```html
<article>
	<p>
		<a href="##pursuit">TL;DR</a>
	</p>

	<p>
		When in the Course of human events, it becomes necessary for one people 
		to dissolve the political bands which have connected them with another, 
		and to assume among the powers of the earth, the separate and equal 
		station to which the Laws of Nature and of Nature’s God entitle them, a 
		decent respect to the opinions of mankind requires that they should 
		declare the causes which impel them to the separation.
	</p>

	<p>
		We hold these truths to be self-evident, that all men are created 
		equal, that they are endowed by their Creator with certain unalienable 
		Rights, that among these are <strong>Life, Liberty and the pursuit of 
		Happiness</strong>.
	</p>
</article>
```

In another example, a `##★★★★☆` unicode fragmention would jump to the 4/5 star rating.

```html
<abbr class="rating" title="4" tabindex="0">★★★★☆</abbr>
```



## JavaScript polyfill

The [fragmention polyfill](https://github.com/chapmanu/fragmentions/blob/master/fragmention.js) lets documents respond to fragmentions. When a fragmention is detected, the document is searched for its matching text. If a match is found, the window jumps to its corresponding element, adding a `fragmention` attribute for styling.

Additionally, the location object is given a fragmention property.

### Browser support

The fragmention polyfill has been successfully tested in desktop Chrome, Firefox, Safari, Opera, and Internet Explorer, as well as Firefox on Android and Safari on iOS. Legacy Internet Explorer 8 is also supported, but marked as deprecated.

<small>Notes: The script is less than 500 bytes when uglified and gzipped. If existing fragmention support is detected on the location object, the polyfill is ignored. To work around an issue with Firefox decoding location hash, location href is used to interpret fragmentions instead. To work around various issues with old IE, light hacking ensues.</small>



## Chrome extension

The [fragmention extension](https://chrome.google.com/webstore/detail/fragmentions/pgajkeekgcmgglngchhmcmnkffnhihck) for Google Chrome lets documents to respond to fragmentions, duplicating the functionality of the JavaScript polyfill.



## Challenges

While most find the idea of fragmentions delightful, there are differing ideas on how they should work. We ask contributors to justify feature requests with concrete real world examples, as tests in the wild may reveal best practices. Otherwise, any of these challenges could be appended with, *“So, uh, what do you think?”*

### Double-hashes in the wild

The [URL specification](http://url.spec.whatwg.org/#url-code-points) does not *allow* fragments to contain hash signs, so links like `<a href="##foo">` may fail validation. On the other hand, browsers *do* understand them, so links like `<a href="##foo">` may have two meanings.

The initial feedback is that few people concern themselves with hash fragment validation, and even less would (at least, knowingly) use them in this way.

Other spec-valid alternatives to the **##** double-hash convention include **#@** (*hash + mention*) and **#*** (*hash + footnote*). These alternatives may also be used address case-sensitivity. Speaking of which&hellip;

### Sensitivity

Matching case is strict, but makes it easier to target specific text. Ignoring case is cavalier, but makes it easier to target anything.

The initial feedback is conflicting. Some expected fuzzy matching. Others expected specific matching. Most agreed that it depends on your specific use-cases, which are sorely lacking in most of the annotations discussions. And what about white space sensitivity?

### URL encoding

Fragmentions are decoded before search, which means `+` plus signs are interpreted as spaces or must be escaped (`%2B`). This makes for prettier, conforming URLs, but may also be confusing for users targeting phrases with special characters.



## Looks good to me

Thanks, now [test it yourself](https://github.com/chapmanu/fragmentions/blob/master/example.html), [give us feedback](https://github.com/chapmanu/fragmentions/issues), and have fun!
