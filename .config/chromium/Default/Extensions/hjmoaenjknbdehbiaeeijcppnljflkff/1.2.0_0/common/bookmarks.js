if (window.location.hash && window.location.hash.length > 1) {
  window.location = chrome.extension.getURL('app/index.html#/bookmarks/view/' + window.location.hash.slice(1));
} else {
  window.location = chrome.extension.getURL('app/index.html#/key');
}
