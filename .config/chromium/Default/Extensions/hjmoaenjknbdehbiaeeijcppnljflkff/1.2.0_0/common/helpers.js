/**
 * @file Common helper methods to add a bookmark to Hush.
 */

var Helpers = {
  context: 'chrome'
};

//
// DO NOT CHANGE CODE BELOW THIS LINE
// COPY FROM `hush-ember/app/utils/helpers.js`
// Be sure to remove the `export default Helpers` at the bottom
//

var Helpers = {};

/**
 * Returns a hashed version of a bookmark key.
 * @param {String} key - the plaintext key
 */
Helpers.hashKey = function hashKey(key) {
  return JSON.stringify(sjcl.hash.sha256.hash(key));
};

/**
 * Formats a bookmark object the right away, making it backwards compatible.
 * @param {Object} bookmark - the bookmark object
 */
var formatBookmark = function formatBookmark(bookmark, i) {
  return {
    url     : bookmark.url,
    text    : bookmark.text || bookmark.title,
    created : bookmark.created || moment(moment().valueOf() - i).toISOString()
  };
};

/**
 * Formats a raw bookmarks object for a key.
 * @param {Object} object - raw bookmarks
 * @return {Object} deserialized - formatted bookmarks object
 */
Helpers.deserializeBookmarks = function deserializeBookmarks(object, storage) {
  var deserialized = {
    version : object.version || 0,
    key     : object.key,
    storage : storage
  };

  if (!object.folders || !object.folders.length) {
    object.folders = [{
      id        : 'home',
      title     : 'Home',
      standard  : true,
      bookmarks : (object.bookmarks || object.data || []).map(formatBookmark)
    }, {
      id        : 'trash',
      title     : 'Trash',
      standard  : true,
      bookmarks : []
    }];
    if (object.data) { delete object.data; }
  }

  deserialized.folders = (object.folders || []).map(function (folder) {
    var folderObject = {
      id        : folder.id || UUID.generate(),
      title     : folder.title,
      standard  : folder.standard,
      bookmarks : (folder.bookmarks || []).map(formatBookmark)
    };

    if (folder.title === 'Home') {
      folderObject.id = 'home';
      deserialized.homeFolder = folderObject;
      if (object.data && object.data.length) {
        folderObject.bookmarks = folderObject.bookmarks.concat(object.data.map(formatBookmark));
      }
    }
    if (folder.title === 'Trash') {
      folderObject.id = 'trash';
      deserialized.trashFolder = folderObject;
    }

    return folderObject;
  });

  return deserialized;
};

/**
 * Merges two sets of bookmarks under the same key.
 * @param {Object} dest - destination to merge into
 * @param {Object} source - source to merge from
 * @return {Boolean} changed - whether dest was mutated (aka need to save again)
 */
Helpers.mergeBookmarks = function mergeBookmarks(dest, source) {
  source = Helpers.deserializeBookmarks(source);
  var foldersMap = {};
  var changed = false;

  (dest.folders || []).forEach(function (folder) {
    folder.bookmarksMap = {};
    (folder.bookmarks || []).forEach(function (bookmark) {
      folder.bookmarksMap[bookmark.url] = bookmark;
    });
    foldersMap[folder.id || folder.title] = folder;
  });

  (source.folders || []).forEach(function (folder) {
    if (foldersMap[folder.id || folder.title]) {
      // if folder exists, merge bookmarks
      var destFolder = foldersMap[folder.id || folder.title];
      (folder.bookmarks || []).forEach(function (bookmark) {
        if (!destFolder.bookmarksMap[bookmark.url]) {
          destFolder.bookmarksMap[bookmark.url] = bookmark;
          changed = true;
        }
      });

    } else {
      // if folder doesn't exist, create new folder and we done
      folder.bookmarksMap = {};
      (folder.bookmarks || []).forEach(function (bookmark) {
        folder.bookmarksMap[bookmark.url] = bookmark;
      });
      foldersMap[folder.id || folder.title] = folder;
      changed = true;
    }
  });

  dest.folders = Object.keys(foldersMap).map(function (v) {
    var folder = foldersMap[v];
    return {
      id        : folder.id || UUID.generate(),
      standard  : folder.standard,
      title     : folder.title,
      bookmarks : Object.keys(folder.bookmarksMap).map(function (u) {
        return folder.bookmarksMap[u];
      })
    };
  });

  return changed;
};

/**
 * Adds a bookmark to Hush. Used by extensions
 * @param {String} options.key
 * @param {Object[]} options.urls - urls with text and url attributes
 * @param {Function} next - callback
 * @param {Object} storage - storage object
 */
Helpers.addToHush = function (options, next, storage) {
  if (!next) { next = function () {}; }

  storage.getData(options.key)
    .then(function (object) {
      var bookmarks = Helpers.deserializeBookmarks(object, storage);

      // add created at to each url
      options.urls.forEach(function (url) {
        url.text = url.text || '';
        url.created = moment().toISOString();
      });

      // find folder
      options.folder = options.folder || 'Home';
      var folder = bookmarks.folders.filter(function (v) {
        return v.title === options.folder;
      })[0];
      if (!folder) {
        folder = {
          title     : options.folder,
          bookmarks : []
        };
        bookmarks.folders.push(folder);
      }
      if (!folder.bookmarks) {
        folder.bookmarks = [];
      }

      // dedupe
      var bookmarksMap = {};
      folder.bookmarks.forEach(function (bookmark) {
        bookmarksMap[bookmark.url] = bookmark;
      });

      // add bookmarks to folder, updating if necessary
      options.urls.forEach(function (doc) {
        if (bookmarksMap[doc.url]) {
          bookmarksMap[doc.url].text = doc.text;
          bookmarksMap[doc.url].created = doc.created;
        } else {
          folder.bookmarks.unshift(doc);
        }
      });

      storage.saveData(options.key, {
        key     : options.key,
        version : bookmarks.version,
        folders : bookmarks.folders
      }).then(function () {
        next();
      }).catch(function (e) {
        console.log(e);
        next();
      });
    });
};
