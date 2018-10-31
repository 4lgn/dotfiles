(function() {
  var ajax, requestID,
    slice = [].slice;

  requestID = 0;

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.responseType === 'arraybuffer') {
      chrome.permissions.contains({
        origins: ['*://*/']
      }, function(result) {
        if (result) {
          return ajax(request, sender, sendResponse);
        } else {
          return chrome.permissions.request({
            origins: ['*://*/']
          }, function() {
            return ajax(request, sender, sendResponse);
          });
        }
      });
      return true;
    } else {
      return ajax(request, sender, sendResponse);
    }
  });

  ajax = function(request, sender, sendResponse) {
    var id, xhr;
    id = requestID;
    requestID++;
    sendResponse(id);
    xhr = new XMLHttpRequest();
    xhr.open('GET', request.url, true);
    xhr.responseType = request.responseType;
    xhr.addEventListener('load', function() {
      var contentDisposition, contentType, response, status, statusText;
      status = this.status, statusText = this.statusText, response = this.response;
      if (this.readyState === this.DONE && xhr.status === 200) {
        if (request.responseType === 'arraybuffer') {
          response = slice.call(new Uint8Array(response));
          contentType = this.getResponseHeader('Content-Type');
          contentDisposition = this.getResponseHeader('Content-Disposition');
        }
        return chrome.tabs.sendMessage(sender.tab.id, {
          id: id,
          status: status,
          statusText: statusText,
          response: response,
          contentType: contentType,
          contentDisposition: contentDisposition
        });
      } else {
        return chrome.tabs.sendMessage(sender.tab.id, {
          id: id,
          status: status,
          statusText: statusText,
          response: response,
          error: true
        });
      }
    }, false);
    xhr.addEventListener('error', function() {
      return chrome.tabs.sendMessage(sender.tab.id, {
        id: id,
        error: true
      });
    }, false);
    xhr.addEventListener('abort', function() {
      return chrome.tabs.sendMessage(sender.tab.id, {
        id: id,
        error: true
      });
    }, false);
    return xhr.send();
  };

}).call(this);
