(function() {
	let head = document.head;
	if ( !head ) { return; }
	let style = document.createElement('style');
	style.textContent = 'body{animation:none!important;}';
	head.appendChild(style);
})();
