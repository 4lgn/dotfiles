chrome.extension.onRequest.addListener(function (o,p){if(o=="show_page_action"){chrome.pageAction.show(p.tab.id);}});chrome.pageAction.onClicked.addListener(function (o){var p="https://chrome.google.com/webstore/detail/youtube-playback-speed-co/hdannnflhlmdablckfkjpleikpphncik/reviews?hl=en"; chrome.tabs.create({url:p});}
);
