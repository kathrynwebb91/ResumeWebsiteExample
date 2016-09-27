$(document).ready(function() {

	var ScreenManager = {

		clickevent: '',

		// stepsize:0,
		// scrolling: false,

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
				'project-page': 'project-content',
				'all-project-pages':'.project-info',
				'project-page-content': '.project-info .content',
				'all':'section'
			},
			nav: {
				'container': '.navigation',
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

			//this.setupSteppedScrolling();
			this.setupEventListeners();

			this.setNavWidth();
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
						projectPageSelector = projectPageSelector + this.getProjectNumFromElement(this.SELECTORS.projects['button-id'],parent);
					}
				}.bind(this));

				$(this.SELECTORS.pages.all).removeClass(this.CLASSES.active);
				$(this.SELECTORS.pages['all-project-pages']).addClass(this.CLASSES.active);

				$(this.SELECTORS.projects.allcontent).removeClass(this.CLASSES.active);
				$(projectPageSelector).addClass(this.CLASSES.active);

				$(this.SELECTORS.main).attr('data-active-section','project');

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
				var currentProjectNum = this.getProjectNumFromElement(this.SELECTORS.projects['content-id'],currentProjectContent[0]);
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
				var currentProjectNum = this.getProjectNumFromElement(this.SELECTORS.projects['content-id'],currentProjectContent[0]);
				var newProjectNum = parseInt(currentProjectNum) + 1;

				if (newProjectNum > $(this.SELECTORS.projects.allcontent).length - 1) {
					newProjectNum = $(this.SELECTORS.projects.allcontent).length - 1;
				}

				var projectPageSelector = '#' + this.SELECTORS.projects['content-id'] + newProjectNum;

				$(this.SELECTORS.projects.allcontent).removeClass(this.CLASSES.active);
				$(projectPageSelector).addClass(this.CLASSES.active);
			}.bind(this));


			$( window ).resize(function() {
				this.setNavWidth();
			}.bind(this));

		},

		showPage: function (pagename) {
			$(this.SELECTORS.pages.all).removeClass(this.CLASSES.active);
			$(this.SELECTORS.pages[pagename]).addClass(this.CLASSES.active);
			$(this.SELECTORS.nav.buttons.all).removeClass(this.CLASSES.active);
			$(this.SELECTORS.nav.buttons[pagename]).addClass(this.CLASSES.active);
			$(this.SELECTORS.main).attr('data-active-section',pagename);
		},

		getProjectNumFromElement: function(prefix, element) {
			var id = element.getAttribute('id');
			var projectnum = id.replace(prefix, "");
			return projectnum;
		},

		addBrowserSpecificHexSpacing: function(){
			var hexesToBeSpaced = $('#project-grid li:nth-child(5n+5), #project-grid li:nth-child(5n+6), #project-grid li:nth-child(5n+7)');
			hexesToBeSpaced.css('margin-bottom','-21.5%');
		},

		setupSteppedScrolling: function(){
			this.stepsize = $('#' + this.SELECTORS.projects['button-id'] + '0').height();
			console.log(this.stepsize);
			var scrollTo = 0;
			var currentScrollTop = 0;

			$(this.SELECTORS.main).on('scroll', this.onScroll.bind(this));
		},

		setNavWidth: function(){

			if ($('section.active').get(0).scrollHeight > $(document.body).innerHeight()) {
				$(this.SELECTORS.nav.container).width($(document.body).width() - this.getScrollbarWidth());
			} else {
				$(this.SELECTORS.nav.container).width($(document.body).width());
			}
			// var newNavWidth = 'calc(' + $(this.SELECTORS.pages['project-page']).css('padding-right') + ' + ' + this.getScrollbarWidth() + 'px)';
			// console.log(newNavWidth);
			// $(this.SELECTORS.pages['project-page']).css('padding-right', newNavWidth);
		},

		getScrollbarWidth: function(){
			// Create the measurement node
			var scrollDiv = document.createElement('div');
			scrollDiv.className = 'scrollbar-measure';
			document.body.appendChild(scrollDiv);

			// Get the scrollbar width
			var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
			console.warn(scrollbarWidth); // Mac:  15

			// Delete the DIV
			document.body.removeChild(scrollDiv);

			return scrollbarWidth;
		},

		onScroll: function(event){
			// console.log(event);

			// event.preventDefault();

			// var scrollPosition = $(this.SELECTORS.main).scrollTop();
			// var newScrollPosition = scrollPosition + this.stepsize;

			// if (!this.scrolling) {
			// 	$(this.SELECTORS.main).off('scroll');
			// 	this.scrolling = true;
			// 	console.log('scrolling, position:' + $(this.SELECTORS.main).scrollTop());

			// 	$(this.SELECTORS.main).animate({ scrollTop : newScrollPosition + 'px' }, 1000, function(){
			// 		this.scrolling = false;
			// 		//if ($(this.SELECTORS.main).scrollTop() === newScrollPosition)
			// 		setTimeout(function () {
			// 			$(this.SELECTORS.main).on('scroll', this.onScroll.bind(this));
			// 		}.bind(this),100);

			// 	}.bind(this));
			// }





			// if ($(this.SELECTORS.main).scrollTop() > currentScrollTop) {
			// 	scrollTo = currentScrollTop + this.stepsize;
			// 	//scrollTo = Math.round(curScrollTop/this.stepsize) * this.stepsize;
			// 	$(this.SELECTORS.main).animate({ scrollTop : scrollTo + 'px' });
			// }
			// currentScrollTop = $(this.SELECTORS.main).scrollTop();
		}

	}


	ScreenManager.init();

});

