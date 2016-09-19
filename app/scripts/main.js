$(document).ready(function() {

	var ScreenManager = {

		clickevent: '',

		CLASSES: {
			active: 'active',
			hidden: 'hidden'
		},

		SELECTORS: {
			main: '.main-container',
			pages: {
				'portfolio':'.portfolio',
				'portfolio-content':'.portfolio .content',
				'resume':'.resume',
				'resume-content':'.resume .content',
				'project-pages':'.project-info',
				'project-page-content': '.project-info .content',
				'all':'section'
			},
			nav: {
				'container': 'navigation',
				'buttons': {
					'portfolio':'.portfolio-button',
					'resume':'.resume-button',
					'all':'.nav-button'
				}
			},
			projects: {
				'button-id': 'project-button-',
				'content-id': 'project-content-',
				'allbuttons': '[id^=project-button-]',
				'allcontent': '[id^=project-content-]',
				'nav': {
					'prev':'.project-nav .prev',
					'next':'.project-nav .next',
					'close':'.project-info .close',
					'all': '.project-info .button'
				}
			},
			resume: {
				'nav': {
					'close':'.resume .close'
				}
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

			// Set up click listeners for main navigation buttons

			$(this.SELECTORS.nav.buttons.portfolio).on(this.clickevent, function(){
				this.showPage('portfolio');
			}.bind(this));

			$(this.SELECTORS.nav.buttons.resume).on(this.clickevent, function(){
				this.showPage('resume');
			}.bind(this));

			//Set up click lsiteners for all project work buttons
			$(this.SELECTORS.projects.allbuttons).on(this.clickevent, function(e){

				var projectPageSelector = '#' + this.SELECTORS.projects['content-id'] + this.getProjectNumFromElement(e.target);

				$(this.SELECTORS.pages.all).removeClass(this.CLASSES.active);
				$(this.SELECTORS.pages['project-pages']).addClass(this.CLASSES.active);

				$(this.SELECTORS.projects.allcontent).removeClass(this.CLASSES.active);
				$(projectPageSelector).addClass(this.CLASSES.active);

				$(this.SELECTORS.main).attr("data-active-section","project");

			}.bind(this));

			//Set up project nav buttons
			$(this.SELECTORS.projects.nav.close).on(this.clickevent, function(){
				console.log('close button clicked');
				this.showPage('portfolio');
			}.bind(this));

			$(this.SELECTORS.resume.nav.close).on(this.clickevent, function(){
				this.showPage('portfolio');
			}.bind(this));

			$(this.SELECTORS.projects.nav.prev).on(this.clickevent, function(){

				console.log('prev pressed');

				var currentProjectContent = $(this.SELECTORS.projects.allcontent + '.' + this.CLASSES.active);
				var currentProjectNum = this.getProjectNumFromElement(currentProjectContent[0]);
				var newProjectNum = parseInt(currentProjectNum) - 1;

				if (newProjectNum < 0) {
					newProjectNum = 0;
				}

				console.log('showing content ' + newProjectNum);

				var projectPageSelector = '#' + this.SELECTORS.projects['content-id'] + newProjectNum;

				$(this.SELECTORS.projects.allcontent).removeClass(this.CLASSES.active);
				$(projectPageSelector).addClass(this.CLASSES.active);

			}.bind(this));

			$(this.SELECTORS.projects.nav.next).on(this.clickevent, function(){

				console.log('next pressed');

				var currentProjectContent = $(this.SELECTORS.projects.allcontent + '.' + this.CLASSES.active);
				var currentProjectNum = this.getProjectNumFromElement(currentProjectContent[0]);
				var newProjectNum = parseInt(currentProjectNum) + 1;

				if (newProjectNum > $(this.SELECTORS.projects.allcontent).length - 1) {
					newProjectNum = $(this.SELECTORS.projects.allcontent).length - 1;
				}

				console.log('showing content ' + newProjectNum);

				var projectPageSelector = '#' + this.SELECTORS.projects['content-id'] + newProjectNum;

				$(this.SELECTORS.projects.allcontent).removeClass(this.CLASSES.active);
				$(projectPageSelector).addClass(this.CLASSES.active);
			}.bind(this));

		},

		showPage: function (pagename) {
			$(this.SELECTORS.pages.all).removeClass(this.CLASSES.active);
			$(this.SELECTORS.pages[pagename]).addClass(this.CLASSES.active);
			$(this.SELECTORS.nav.buttons.all).removeClass(this.CLASSES.active);
			$(this.SELECTORS.nav.buttons[pagename]).addClass(this.CLASSES.active);
			$(this.SELECTORS.main).attr("data-active-section",pagename);
		},

		getProjectNumFromElement: function(element) {
			var id = element.getAttribute('id');
			var projectnum = id.substring(id.length - 1, id.length);
			return projectnum;
		}

	}


	ScreenManager.init();

});

