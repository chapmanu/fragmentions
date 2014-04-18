// return first element in scope containing case-sensitive text 
function getElementByText(scope, text) {
	// iterate descendants of scope
	for (var all = scope.childNodes, index = 0, element; (element = all[index]); ++index) {
		// conditionally return element containing visible, case-sensitive text (matched)
		if (element.nodeType === 1 && (element.innerText || element.textContent || '').indexOf(text) !== -1) {
			return getElementByText(element, text);
		}
	}

	// return scope (unmatched)
	return scope;
}

// on dom loaded or hash change
function onHashChange() {
	// detect auto-anchor
	// This doesn't use hash because of e.g.
	// https://bugzilla.mozilla.org/show_bug.cgi?id=378962
	var text = location.href.match(/#(#|%23)(.+)/);

	if (text) {
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

// event listeners
window.addEventListener('hashchange', onHashChange);
document.addEventListener('DOMContentLoaded', onHashChange);
