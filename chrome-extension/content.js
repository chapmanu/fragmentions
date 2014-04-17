// return first element in scope containing case-sensitive text 
function getElementByText(scope, text) {
	// iterate descendants of scope
	for (var all = scope.getElementsByTagName('*'), index = 0, element; (element = all[index]); ++index) {
		// conditionally return element containing visible, case-sensitive text (matched)
		if ((element.innerText || element.textContent).indexOf(text) !== -1) {
			return getElementByText(element, text);
		}
	}

	// return scope (unmatched)
	return scope;
}

// on dom loaded or hash change
function onHashChange() {
	// detect auto-anchor
	var text = location.href.match(/##.+/);

	if (text) {
		// get element containing text (or return document)
		var element = getElementByText(
			// document scope
			document,
			// uri-decoded text
			decodeURIComponent(text[0].slice(2).replace(/\+/g, ' '))
		);

		// if element found
		if (element !== document) {
			// after a brief delay
			setTimeout(function () {
				// get element position
				var rect = element.getBoundingClientRect();

				// scroll to element
				window.scrollBy(Math.floor(rect.left), Math.floor(rect.top));

				// focus element
				element.focus();

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

// attach events
window.addEventListener('hashchange', onHashChange);
document.addEventListener('DOMContentLoaded', onHashChange);
