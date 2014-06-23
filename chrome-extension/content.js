// detect native/existing fragmention support
if (!('fragmention' in window.location)) (function () {
	// populate fragmention
	location.fragmention = location.fragmention || '';

	// return first element in scope containing case-sensitive text
	function getElementsByText(scope, text) {
		// iterate descendants of scope
		for (var all = scope.childNodes, index = 0, element, list = []; (element = all[index]); ++index) {
			// conditionally return element containing visible, whitespace-insensitive, case-sensitive text (a match)
			if (element.nodeType === 1 && (element.innerText || element.textContent || '').replace(/\s+/g, ' ').indexOf(text) !== -1) {
				list = list.concat(getElementsByText(element, text));
			}
		}

		// return scope (no match)
		return list.length ? list : scope;
	}

	// on dom ready or hash change
	function onHashChange() {
		// set location fragmention as uri-decoded text (from href, as hash may be decoded)
		var
		id = location.href.match(/#((?:#|%23)?)(.+)/) || [0,'',''],
		node = document.getElementById(id[1]+id[2]),
		match = decodeURIComponent(id[2]).replace(/\+/g, ' ').split('  ');

		location.fragmention = match[0];
		location.fragmentionIndex = parseFloat(match[1]) || 0;

		// conditionally remove stashed element fragmention attribute
		if (element) {
			element.removeAttribute('fragmention');
		}

		// if fragmention exists
		if (!node && location.fragmention) {
			var
			// get all elements containing text (or document)
			elements = getElementsByText(document, location.fragmention),
			// get total number of elements
			length   = elements.length,
			// get index of element
			modulus  = length && location.fragmentionIndex % length,
			index    = length && modulus >= 0 ? modulus : length + modulus;

			// get element
			element = length && elements[index];

			// if element found
			if (element) {
				// scroll to element
				element.scrollIntoView();

				// set fragmention attribute
				element.setAttribute('fragmention', '');
			}
			// otherwise clear stashed element
			else {
				element = null;
			}
		}
	}

	// set stashed element
	var element;

	// add listeners
	document.addEventListener('DOMContentLoaded', onHashChange);
	window.addEventListener('hashchange', onHashChange);
})();
