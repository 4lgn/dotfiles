;(function () {

$('#popup-warning-button').click(function () {
  chrome.windows.create({
    url: chrome.extension.getURL('app/index.html#/key'),
    incognito: true
  });
});

})();
