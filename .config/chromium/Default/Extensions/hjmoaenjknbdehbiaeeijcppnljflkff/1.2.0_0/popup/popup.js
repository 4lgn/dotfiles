;(function () {

/**
 * Initialize storage
 */
var CHROME_CONTEXT = 'chrome';
var storage = new StorageService({
  config  : { context: CHROME_CONTEXT },
  helpers : Helpers
});

/**
 * Initialize storage context
 */
storage.getContext()
  .then(function (data) {
    storage.fetchAuthStatus(data)
      .then(function (status) {
        // context fetch done
        console.log('Fetched auth status', status);
      });
  });

/**
 * When opening popup, get information from current window
 */
chrome.tabs.query({ currentWindow: true }, function (tabs) {
  var active = tabs.filter(function (v) { return v.active; })[0];
  if (!active) { return; }

  var url = active.url;
  if (!url) { return; }

  /**
   * Refresh list of folders when user types in textbox.
   */
  $('#key').keyup(function() {
    $('.dropdown-menu .folder,.dropdown-menu .dropdown-header,.dropdown-menu .divider').remove();

    var key = $('#key').val();
    if (!key) { return; }

    storage.getData(key, CHROME_CONTEXT, { localOnly: true })
      .then(function (object) {
        var bookmarks = Helpers.deserializeBookmarks(object, storage);
        if (bookmarks.folders && bookmarks.folders.length) {
          $('.dropdown-menu')
            .append($('<li/>')
              .addClass('divider')
              .attr('role', 'presentation'))
            .append($('<li/>')
              .addClass('dropdown-header')
              .attr('role', 'presentation')
              .text('Add to folder:'));
        }
        bookmarks.folders.forEach(function (folder) {
          if (folder.title === 'Trash') { return; }
          $('.dropdown-menu').append(
            $('<li/>')
              .addClass('folder')
              .attr('role', 'presentation')
              .append($('<a href=#/>')
                .attr('data-folder', folder.title)
                .text(folder.title)));
        });
      });
  });

  /**
   * Gets the currently typed key.
   */
  var getKey = function () {
    var key = $('#key').val();
    if (!key) {
      $('#key').addClass('error');
      return;
    }
    $('#key').removeClass('error');
    return key;
  };

  /**
   * Display success message when bookmarks are added successfully.
   * @param {String} key - the currently entered key
   */
  var done = function (key) {
    $('#add-form').hide();
    $('#add-complete').show();
    $('#add-complete > button').unbind('click')
      .click(function () { chrome.tabs.create({ url: chrome.extension.getURL('app/index.html#/bookmarks/view/' + key) }); });
    };

  /**
   * Add current page to a bookmarks list.
   */
  var add = function () {
    var key = getKey();
    if (!key) { return; }

    Helpers.addToHush({
      key    : key,
      urls   : [{ url: url, text: active.title || '' }],
      folder : $(this).data('folder') || 'Home'
    }, function () { done(key); }, storage);

    return false;
  };

  /**
   * Add all open tabs to a bookmarks list.
   */
  var all = function () {
    var key = getKey();
    if (!key) { return; }

    Helpers.addToHush({
      key    : key,
      urls   : tabs.map(function (v) { return { url: v.url, text: v.title }; }),
      folder : 'Home'
    }, function () { done(key); }, storage);

    return false;
  };

  /**
   * View bookmarks for a key instead of adding anything.
   */
  var view = function () {
    var key = getKey();

    if (!key) {
      chrome.tabs.create({ url: chrome.extension.getURL('app/index.html#key') });
      window.close();
      return;
    }

    chrome.tabs.create({ url: chrome.extension.getURL('app/index.html#/bookmarks/view/' + key) });
    window.close();

    return false;
  };

  $('#add').click(add);
  $('#all').click(all);
  $('#view').click(view);

  $('#add-form').submit(function (e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    add();
    return false;
  });

  $('.dropdown-menu').on('click', '.folder a', add);
});

})();
