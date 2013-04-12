var navigation = Alloy.Globals.navigation;
var mainWindow = navigation.getMainWindow();

$.menuOpen = false;

exports.init = function() {
	mainWindow.add($.menuWrap);
	
	if (OS_IOS) {
		$.menu.remove($.buttonExit);
	}
};

exports.toggle = function() {
	exports.fireEvent("toggle");
	Ti.API.info("Toggling menu");
	
	if ($.menuOpen) {
		exports.close();
	}
	else {
		exports.open();
	}
};
	
exports.open = function() {
	if ( ! $.menuOpen) {
		Ti.API.info("Opening menu");
		$.menuOpen = true;
		exports.fireEvent("openstart");
		
		// Set the width of the menu
		var newMenuWidth = mainWindow.size.width - 70;
		$.menu.width = (newMenuWidth > $.menu.width) ? $.menu.width : newMenuWidth;	

		// Show menu
		navigation.appWrap.animate({left: $.menu.width, duration: 150, curve: Ti.UI.ANIMATION_CURVE_EASE_OUT}, function() {
			exports.fireEvent("opencompleted");
		});
	}
	else {
		Ti.API.info("Attempted to open the menu when it was already open");
	}
};
	
exports.close = function() {
	if ($.menuOpen) {
		Ti.API.info("Closing menu");
		exports.fireEvent("closestart");
		
		// hide menu
		navigation.appWrap.animate({left: 0, duration: 150, curve: Ti.UI.ANIMATION_CURVE_EASE_OUT}, function() {
			$.menuOpen = false;
			exports.fireEvent("closecompleted");
		});
	}
	else {
		Ti.API.info("Attempted to close the menu when it was already closed");
	}
};

exports.isOpen = function() {
	return $.menuOpen;
};

exports.addEventListener = function(eventName, action) {
	$.menuWrap.addEventListener(eventName, action);
};
exports.removeEventListener = function(eventName, action) {
	$.menuWrap.removeEventListener(eventName, action);
};
exports.fireEvent = function(eventName) {
	$.menuWrap.fireEvent(eventName);
};


// Enable closing of menu by clicking the content when it's open
exports.addEventListener("opencompleted", function(){
	navigation.appWrap.addEventListener("click", exports.close);
});

// Disable closing of menu by clicking the content when it's hidden
exports.addEventListener("closestart", function(){
	navigation.appWrap.removeEventListener("click", exports.close);
});

// Buttons
$.buttonIndex.addEventListener("click", function(e) {
	if (navigation.getCurrentOptions().identifier != 'index') {
		navigation.open(navigation.get('index'), navigation.get('indexOptions'));
	}
	else {
		exports.close();
	}
});
$.buttonTopLevel.addEventListener("click", function(e) {
	if (navigation.getCurrentOptions().identifier != 'topview') {
		navigation.open("demo_topview", {title: 'Topview', topLevel: true, identifier: 'topview'});
	}
	else {
		exports.close();
	}
});
$.buttonExit.addEventListener("click", function(e) {
	navigation.exit();
});

