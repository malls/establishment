(function(window, document) {

	if (window.attachEvent) {
	    window.attachEvent('onload', highlighter);
	} else {
	    if (window.onload) {
	        var curronload = window.onload;
	        var newonload = function(evt) {
	            curronload(evt);
	            highlighter();
	        };
	        window.onload = newonload;
	    } else {
	        window.onload = highlighter;
	    }
	}

	function highlighter() {
		const page = window.location.pathname;
		let tabType = 'index';
		if (page.includes('archive')) {
			tabType = 'archive';
		} else if (page.includes('runway')) {
			tabType = 'runway';
		} else if (page.includes('contact')) {
			tabType = 'contact';
		}


	    [].forEach.call(document.getElementsByClassName('menu-item'), (el) => {
	        el.classList.remove('menu-item-active');
	    });
	    document.getElementById(`${tabType}-tab`).classList.add('menu-item-active');
	}


})(window, document);