$(document).ready(function() {

	var ScreenManager = {

		clickevent: '',

		CLASSES: {
			active: 'active',
			hidden: 'hidden',
			hover: 'hover'
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
				'button-containers': '#project-grid li',
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
				$(this.SELECTORS.projects['button-containers']).addClass(this.CLASSES.hover);

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

				var projectPageSelector = '#' + this.SELECTORS.projects['content-id'];

				$(e.target).parents().each(function (index, parent){
					if ($(parent).hasClass('project-button')) {
						projectPageSelector = projectPageSelector + this.getProjectNumFromElement(parent);
					}
				}.bind(this));

				$(this.SELECTORS.pages.all).removeClass(this.CLASSES.active);
				$(this.SELECTORS.pages['project-pages']).addClass(this.CLASSES.active);

				$(this.SELECTORS.projects.allcontent).removeClass(this.CLASSES.active);
				$(projectPageSelector).addClass(this.CLASSES.active);

				$(this.SELECTORS.main).attr("data-active-section","project");

			}.bind(this));

			//Set up project nav buttons
			$(this.SELECTORS.projects.nav.close).on(this.clickevent, function(){
				this.showPage('portfolio');
			}.bind(this));

			$(this.SELECTORS.resume.nav.close).on(this.clickevent, function(){
				this.showPage('portfolio');
			}.bind(this));

			$(this.SELECTORS.projects.nav.prev).on(this.clickevent, function(){

				var currentProjectContent = $(this.SELECTORS.projects.allcontent + '.' + this.CLASSES.active);
				var currentProjectNum = this.getProjectNumFromElement(currentProjectContent[0]);
				var newProjectNum = parseInt(currentProjectNum) - 1;

				if (newProjectNum < 0) {
					newProjectNum = 0;
				}

				var projectPageSelector = '#' + this.SELECTORS.projects['content-id'] + newProjectNum;

				$(this.SELECTORS.projects.allcontent).removeClass(this.CLASSES.active);
				$(projectPageSelector).addClass(this.CLASSES.active);

			}.bind(this));

			$(this.SELECTORS.projects.nav.next).on(this.clickevent, function(){

				var currentProjectContent = $(this.SELECTORS.projects.allcontent + '.' + this.CLASSES.active);
				var currentProjectNum = this.getProjectNumFromElement(currentProjectContent[0]);
				var newProjectNum = parseInt(currentProjectNum) + 1;

				if (newProjectNum > $(this.SELECTORS.projects.allcontent).length - 1) {
					newProjectNum = $(this.SELECTORS.projects.allcontent).length - 1;
				}

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

