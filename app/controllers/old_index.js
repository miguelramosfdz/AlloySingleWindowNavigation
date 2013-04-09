var navigation = Alloy.createController("navigation");
Alloy.Globals.navigation = navigation;
var conf = {};

/* -- Bootstrap your application below this line -- */

conf = {
	index: "demo_welcome",
	defaultViewMode: 'nav',
	defaultOpenTransition: {transition: 'none', duration: 150},
	defaultBackTransition: {transition: 'none', duration: 150},
	indexOptions: {
		topLevel: true,
		viewMode: 'nav',
		title: 'Welcome',
		identifier: 'index',
	},
	menuDriver: 'demo_menu',
	historyLimit: 10, // 0 now equals infinite
	//nav: 'demo_navControls',
	//defaultViewDriver: 'demo_view',
	bindMenu: true,
	confirmOnExit: true,
};

/* -- Bootstrap your application above this line -- */

navigation.init(conf);