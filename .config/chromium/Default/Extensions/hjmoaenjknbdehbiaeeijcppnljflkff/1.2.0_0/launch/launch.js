$('#extensions').click(function () {
  chrome.runtime.sendMessage({ directive: 'open-extensions' });
});
