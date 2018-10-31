/**
 * @file Background page scripts for Hush chrome extension.
 */

var version = '1.2.0';

chrome.storage.local.get('version', function (v) {
  if (!v || !v.version) { window.open('launch.html'); }

  chrome.storage.local.set({ version: version });
});

var listening = false;

var refreshWindow = function (w) {
  console.log(w);
  if (!w || !w.incognito) {
    chrome.browserAction.setTitle({ title: 'Hush' });
    chrome.browserAction.setPopup({popup: 'popup/default.html' });
    chrome.browserAction.setIcon({
      path: {
        19: 'images/icon-19-dk.png',
        38: 'images/icon-38-dk.png'
      }
    });
    chrome.omnibox.setDefaultSuggestion({ description: 'WARNING: You are on a normal window, and so for your safety we have disabled Hush.' });

  } else {
    chrome.browserAction.setTitle({ title: 'Bookmark with Hush' });
    chrome.browserAction.setPopup({popup: 'popup/index.html' });
    chrome.browserAction.setIcon({
      path: {
        19: 'images/icon-19.png',
        38: 'images/icon-38.png'
      }
    });
    chrome.omnibox.setDefaultSuggestion({ description: 'Access bookmarks with Hush password %s...' });
  }

  if (!listening) {
    chrome.omnibox.onInputEntered.addListener(function (key) {
      chrome.tabs.create({ url: chrome.extension.getURL('app/index.html#/bookmarks/view/' + key) });
    });

    listening = true;
  }

  try {
    chrome.contextMenus.create({
      type     : 'normal',
      id       : 'hush-context-addbookmark',
      title    : 'Hush: Add link to private bookmarks',
      contexts : ['link'],
      onclick: function (obj) {
        var key = prompt('Enter Hush password...');
        if (!key || !obj || !obj.linkUrl) { return; }

        var storage = new StorageService({
          config  : { context: 'chrome' },
          helpers : Helpers
        });

        storage.getContext()
          .then(function (data) {
            storage.fetchAuthStatus(data)
              .then(function (status) {
                // context fetch done
                Helpers.addToHush({
                  key    : key,
                  urls   : [{ url: obj.linkUrl, text: obj.selectionText || '' }],
                  folder : 'Home'
                }, function () {}, storage);
              });
          });
      }
    });
  } catch (e) {}
};

chrome.extension.isAllowedIncognitoAccess(function (allow) {
  if (!allow) {
    chrome.browserAction.setTitle({ title: 'Hush' });
    chrome.browserAction.setPopup({popup: 'popup/default.html' });
    chrome.browserAction.setIcon({
      path: {
        19: 'images/icon-19.png',
        38: 'images/icon-38.png'
      }
    });
    chrome.omnibox.setDefaultSuggestion({ description: 'WARNING: You must allow incognito access and be using an incognito window to use Hush.' });
    return;
  }

  chrome.windows.getCurrent(refreshWindow);
});

chrome.windows.onFocusChanged.addListener(function (id) {
  if (id !== -1) {
    chrome.windows.get(id, refreshWindow);
  }
});

chrome.windows.onCreated.addListener(function (w) {
  refreshWindow(w);
});

chrome.runtime.onMessage.addListener(function (req, sender, res) {
  if (req.directive === 'open-extensions') {
    chrome.tabs.create({ url: 'chrome://extensions' });
  }
});
