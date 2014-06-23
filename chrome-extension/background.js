'use strict';

/* global chrome */

chrome.contextMenus.create({
	title: 'Create fragmention',
	contexts: ['selection'],
	onclick: function (event) {
		if (chrome.tabs) {
			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, function (tabs) {
				var
				tab = tabs[0],
				url = tab.url.replace(/#.*$/, ''),
				text = event.selectionText,
				hash = '##' + encodeURI(text.trim()).replace(/\+/g, '%2B').replace(/(%20)+/g, '+');

				chrome.tabs.update(tab.id, {
					url: url + hash
				});
			});
		}
	}
});
