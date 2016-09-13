$(document).ready(function() {

	var ScreenManager = {

		clickevent: '',

		CLASSES: {
			active: 'active'
		},

		SELECTORS: {
			pages: {
				'portfolio':'.portfolio',
				'portfolio-content':'.portfolio .overlay',
				'resume':'.resume',
				'resume-content':'.resume .overlay',
				'work-detail-pages':'.work-detail',
				'work-detail-page-content': 'work-detail',
				'all':'section'
			},
			navbuttons: {
				'portfolio':'.portfolio-button',
				'resume':'.resume-button',
				'all':'.nav-button'
			}
		},

		init: function() {

			if (Modernizr.touch) {
				this.clickevent = 'touchstart';
			} else {
				this.clickevent = 'click';
			}

			this.setupEventListeners();
		},

		setupEventListeners: function() {

			$(this.SELECTORS.navbuttons.portfolio).on(this.clickevent, function(){
				$(this.SELECTORS.pages.all).removeClass(this.CLASSES.active);
				$(this.SELECTORS.pages.portfolio).addClass(this.CLASSES.active);
				$(this.SELECTORS.navbuttons.all).removeClass(this.CLASSES.active);
				$(this.SELECTORS.navbuttons.portfolio).addClass(this.CLASSES.active);
			}.bind(this));

			$(this.SELECTORS.navbuttons.resume).on(this.clickevent, function(){
				$(this.SELECTORS.pages.all).removeClass(this.CLASSES.active);
				$(this.SELECTORS.pages.resume).addClass(this.CLASSES.active);
				$(this.SELECTORS.navbuttons.all).removeClass(this.CLASSES.active);
				$(this.SELECTORS.navbuttons.resume).addClass(this.CLASSES.active);
			}.bind(this));

		}

	}


	ScreenManager.init();

});

