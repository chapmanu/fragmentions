(function () {
	'use strict';

	// return first element in scope containing case-sensitive text 
	function getElementByText(scope, text) {
		// iterate descendants of scope
		for (var all = scope.childNodes, index = 0, element; (element = all[index]); ++index) {
			// conditionally return element containing visible, case-sensitive text (matched)
			if (element.nodeType == 1 && (element.innerText || element.textContent || '').indexOf(text) !== -1) {
				return getElementByText(element, text);
			}
		}

		// return scope (unmatched)
		return scope;
	}

	// on dom loaded or hash change
	function onHashChange() {
		// detect auto-anchor
		var text = location.href.match(/#(#|%23)(.+)/);

		if (text) {
			// Remove any existing class
			if (document.getElementsByClassName) {
				var existing = document.getElementsByClassName('fragmention');
				Array.prototype.forEach.call(existing, function(el) {
					el.className = el.className.replace(/\bfragmention\b/, '');
				});
			}

			// get element containing text (or return document)
			var element = getElementByText(
				// document scope
				document,
				// uri-decoded text
				decodeURIComponent(text[2].replace(/\+/g, ' '))
			);

			// if element found
			if (element !== document) {
				// after 1/60 second delay
				setTimeout(function () {
					// scroll to element
					element.scrollIntoView();

					// focus element
					element.focus();

					// Give element an appropriate class
					element.className = element.className ? element.className + ' fragmention' : 'fragmention';

					// if element could not be focused
					if (document.activeElement !== element) {
						// focus as focusable element
						element.setAttribute('tabindex', 0);

						element.focus();
					}
				}, 16);
			}
		}
	}

	// event listeners (DEPRECATED: IE8 compatibility)
	var
	hasEventListener = 'addEventListener' in window,
	eventListener = hasEventListener ? 'addEventListener' : 'attachEvent',
	eventPrefix = hasEventListener ? '' : 'on';

	// listener support matches DOMContentLoaded support
	if (hasEventListener) document[eventListener](eventPrefix + 'DOMContentLoaded', onHashChange);
	// DEPRECATED: otherwise use load event 
	else window[eventListener](eventPrefix + 'load', onHashChange);

	window[eventListener](eventPrefix + 'hashchange', onHashChange);
})();
