//
// DO NOT CHANGE CODE IN THIS FILE
// COPY FROM from `hush-ember/app/utils/storage.js`
// Be sure to remove the `export default Helpers` at the bottom
//
/**
 * @file Storage utility functions. Used in Ember app and browser bookmark pages.
 * Use ES5 methods as this will be copy pasted into browser extensions.
 */

var CONTEXTS = {
  chrome  : 'chrome',
  firefox : 'firefox',
  safari  : 'safari',
  web     : 'web'
};

var DEFAULT_HOST = 'https://hushbookmarks.com';

/**
 * StorageService constructor.
 * @param {Object} options.config - configuration object
 * @param {Object} options.helpers - helpers exports object
 * @param {Object} options.ajax - ajax request object
 * @param {Object} options.notifications (optional) - notifications object
 * @param {Boolean} options.isAuthed - whether user is authed
 * @param {Boolean} options.hasSubscription - whether user is subscribed
 */
var StorageService = function StorageService(options) {
  var self = this;

  // required
  self._config          = options.config;
  self._helpers         = options.helpers;
  self._isAuthed        = options.isAuthed;
  self._hasSubscription = options.hasSubscription;

  // optional
  self._notifications   = options.notifications;

  // default ajax command
  self._ajax = options.ajax || {
    get: function (url) {
      return $.get((self._config.host || DEFAULT_HOST) + url);
    },
    post: function (url, data) {
      return $.post((self._config.host || DEFAULT_HOST) + url, data.data ? JSON.parse(data.data) : data);
    }
  };
};

/**
 * Updates user settings in storage service.
 * @param {Boolean} options.isAuthed - whether user is authed
 * @param {Boolean} options.hasSubscription - whether user is subscribed
 */
StorageService.prototype.updateUser = function updateUser(options) {
  this._isAuthed        = options.isAuthed;
  this._hasSubscription = options.hasSubscription;
};

/**
 * Gets data from appropriate service, given a key and context.
 * @param {String} key
 * @param {String} context
 * @param {Object} options
 */
StorageService.prototype.getData = function getData(key, context, options) {
  var self = this;
  var hash = self._helpers.hashKey(key);

  var notFoundOnServer;

  return new Promise(function (resolve) {
    /**
     * Gets local bookmarks data, merging data returned from the server if provided.
     * @param {Object} serverData (optional)
     */
    var getLocalData = function (serverData) {
      new Promise(function (resolve, reject) {
        switch (context || self._config.context) {
          // chrome extension
          case CONTEXTS.chrome:
            chrome.storage.local.get(hash, function (body) {
              resolve(self.decodeData(key, body && body[hash]));
            });
            break;

          // web
          default:
            if (window.localStorage) {
              var body = window.localStorage.getItem(hash);
              resolve(self.decodeData(key, body));
            } else {
              if (self._notifications) { self._notifications.error('No local storage available for your bookmarks!'); }
              reject();
            }
        }

      }).then(function (localData) {
        var data;
        var changed;

        notFoundOnServer = notFoundOnServer && localData.folders && localData.folders.some(function (v) {
          return v.bookmarks && v.bookmarks.length;
        });

        // if server data version is higher than local, use server data
        if (serverData && serverData.version && localData && localData.version && serverData.version >= localData.version) {
          data = serverData;

        // if no local version or server version, merge
        } else if (serverData) {
          changed = self._helpers.mergeBookmarks(serverData, localData);
          data = serverData;

        // if no server data, use local
        } else {
          data = self._helpers.deserializeBookmarks(localData);
        }

        data.resave = notFoundOnServer || changed;
        resolve(data);

      }).catch(function (err) {
        console.log(err);
        if (self._notifications) { self._notifications.error('Fetching local data failed.'); }
        resolve();
      });
    };

    // don't fetch remote data if not authed or no subscription
    if (!self._isAuthed || !self._hasSubscription || (options && options.localOnly)) {
      getLocalData();
      return;
    }

    // fetch remote data
    self._ajax.post('/api/bookmarks/fetch', {
      data: JSON.stringify({ key: hash }),
      contentType: 'application/json'

    }).then(function (doc) {
      if (doc && doc.cipher) {
        self.decodeData(key, doc.cipher)
          .then(function (plain) {
            plain.version = doc.version;
            getLocalData(plain);
          }).catch(function () {
            if (self._notifications) { self._notifications.error('Fetching server data failed; loading from local bookmarks instead.'); }
            getLocalData();
          });
      } else {
        getLocalData();
      }

    }).catch(function () {
      notFoundOnServer = true;
      getLocalData();
    });
  });
};

/**
 * Encrypts and returns data.
 * @param {String} key - the key
 * @param {Object} data - folders/bookmarks data
 * @return {String} cipher - encrypted ciphertext
 */
StorageService.prototype.encryptData = function encryptData(key, data) {
  return sjcl.encrypt(key, JSON.stringify(data));
};

/**
 * Persists data of a certain key to the correct storage service.
 * @param {String} key - the key
 * @param {Object} data - folders/bookmarks data
 * @param {String} context - the context for storage service
 */
StorageService.prototype.saveData = function saveData(key, data, context) {
  var self   = this;
  var hash   = self._helpers.hashKey(key);
  var cipher = sjcl.encrypt(hash, JSON.stringify(data));

  data.version = (data.version || 0) + 1;

  return new Promise(function (resolve, reject) {
    var saveLocalData = function () {
      switch (context || self._config.context) {
        // chrome extension
        case CONTEXTS.chrome:
          var store = {};
          store[hash] = cipher;
          chrome.storage.local.set(store, function () {
            resolve({ version: data.version });
          });
          break;

        // web
        default:
          if (window.localStorage) {
            window.localStorage.setItem(hash, cipher);
            resolve({ version: data.version });

          } else {
            if (self._notifications) { self._notifications.error('No local storage available for your bookmarks!'); }
            reject();
          }
      }
    };

    // don't save remote data if not authed or no subscription
    if (!self._isAuthed || !self._hasSubscription) {
      saveLocalData();
      return;
    }

    self._ajax.post('/api/bookmarks/upsert', {
      data: JSON.stringify({
        key     : hash,
        cipher  : cipher,
        version : data.version,
        context : self._config.context
      }),
      contentType: 'application/json'

    }).then(function (data) {
      saveLocalData(data);

    }).catch(function () {
      if (self._notifications) { self._notifications.warning('Sync data with server failed. Your data will be stored locally until next time you save.'); }
      saveLocalData();
    });
  });
};

/**
 * Decodes ciphertext using a key synchronously. Remember to catch errors.
 * @param {String} key - the key
 * @param {String} cipher - the ciphertext
 */
StorageService.prototype.decodeDataSync = function decodeDataSync(key, cipher) {
  var hash = this._helpers.hashKey(key);

  var plain; // plaintext

  if (cipher) {
    try {
      plain = sjcl.decrypt(hash, cipher);
    } catch (e) {
      plain = sjcl.decrypt(key, cipher);
    }
    plain = JSON.parse(plain);
    if (plain.version > 0 && plain.key !== key) {
      throw new Error('Invalid data format.');
    }

  } else {
    plain = {
      key  : key,
      data : null
    };
  }

  return plain;
};

/**
 * Gets the local context, context id, and token if it exists. Always succeeds.
 * @return {Promise} a promise that is called with the context object
 */
StorageService.prototype.getContext = function getContext() {
  var self    = this;
  var context = context || self._config.context;

  return new Promise(function (resolve) {
    switch (context) {
      // chrome extension
      case CONTEXTS.chrome:
        chrome.storage.local.get('context', function (body) {
          resolve(body && body.context || { context: context });
        });
        break;

      // web
      default:
        if (window.localStorage) {
          var body = window.localStorage.getItem('context');
          resolve(body || { context: context });
        } else {
          resolve({ context: context });
        }
    }
  });
};

/**
 * Gets the auth status, sending up context data if available. Always succeeds.
 * @param {String} context.context
 * @param {String} context.contextId
 * @param {String} context.token
 */
StorageService.prototype.fetchAuthStatus = function fetchAuthStatus(context) {
  var self = this;

  var qs = [];
  if (context) {
    if (context.token) { qs.push('token=' + encodeURIComponent(context.token)); }
    if (context.context) { qs.push('context=' + encodeURIComponent(context.context)); }
    if (context.contextId) { qs.push('contextId=' + encodeURIComponent(context.contextId)); }
  }
  qs = qs.join('&');

  return new Promise(function (resolve) {
    self._ajax
      .get('/auth/status' + (qs ? '?' + qs : ''))
      .then(function (data) {
        self._isAuthed        = data && data.authed;
        self._hasSubscription = data && data.authed && data.plan && data.subscriptionId;
        resolve(data);
      })
      .catch(function () {
        self._isAuthed        = false;
        self._hasSubscription = false;
        resolve({ authed: false });
      });
  });
};

/**
 * Saves the context id and/or token to local context. Always succeeds.
 * @param {String} options.context
 * @param {String} options.contextId
 * @param {String} options.token
 */
StorageService.prototype.saveContext = function saveContext(data) {
  var context = context || this._config.context;

  return new Promise(function (resolve) {
    switch (context) {
      // chrome extension
      case CONTEXTS.chrome:
        var store = { context: { context: context } };
        if (data.contextId) {
          store.context.contextId = data.contextId;
        }
        if (data.token) {
          store.context.token = data.token;
        }
        chrome.storage.local.set(store, function () {
          resolve();
        });
        break;

      // web
      default:
        if (window.localStorage) {
          window.localStorage.setItem('context', data);
          resolve();
        } else {
          resolve();
        }
    }
  });
};

/**
 * Clears the local context. Always succeeds.
 * If on web, clears localstorage too.
 * @return {Promise}
 */
StorageService.prototype.clearContext = function clearContext() {
  var context = context || this._config.context;

  return new Promise(function (resolve) {
    switch (context) {
      // chrome extension
      case CONTEXTS.chrome:
        chrome.storage.local.remove('context', function () {
          resolve();
        });
        break;

      // web
      default:
        if (window.localStorage) {
          window.localStorage.clear();
          resolve();
        } else {
          resolve();
        }
    }
  });
};

/**
 * Decodes ciphertext using a key asynchronously.
 * @param {String} key - the key
 * @param {String} cipher - the ciphertext
 */
StorageService.prototype.decodeData = function decodeData(key, cipher) {
  var plain;
  return new Promise(function(resolve, reject) {
    try {
      plain = this.decodeDataSync(key, cipher);
      resolve(plain);
    } catch (e) {
      reject(e);
    }
  }.bind(this));
};
