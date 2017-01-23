$(document).ready(function() {

	var ScreenManager = {

		clickevent: '',
		scrollTarget: null,

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
					'all':'.nav-button',
          'labels': '.nav-button .nav-label'
				}
			},
			projects: {
				'button-containers': '#project-grid li',
				'button-id': 'project-button-',
				'content-id': 'project-content-',
				'allbuttons': '[id^=project-button-]',
				'allcontent': '[id^=project-content-]',
				'nav': {
          'container': '.project-nav',
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

    originalArrowSpacing: 0,
    arrowScrollLimit: 0,
		imagesloadedCount: 0,
		numberOfImages: 0,

		init: function() {

			if (Modernizr.touch) {

				//this.clickevent = 'touchstart';
				$(this.SELECTORS.projects['button-containers']).addClass(this.CLASSES.hover);

			}
			//} else {
			this.clickevent = 'click';
			//}

			//this.setupSteppedScrolling();
			this.setupEventListeners();

			this.setNavWidth();

			$('body').waitForImages(function() {
				// All images loaded
				$('body').addClass('loaded');
				$('.loading-hex .hexagon.inner').css('height', '0');
			}, function(loaded, count, success) {
				// {count} out of {loaded} images loaded
				var newHeight = 93.6 - (93.6 * (loaded/count));
				$('.loading-hex .hexagon.inner').css('height', newHeight);
			});

			this.setHexSpacing();

		},

		setupEventListeners: function() {

			// Set up click listeners for main navigation buttons

			$(this.SELECTORS.nav.buttons.portfolio).on(this.clickevent, function(){
				this.showPage('portfolio');
				this.setNavWidth();
				this.scrollTarget.scrollTop(0);
				this.resetCollapsableNav(this.scrollTarget);
			}.bind(this));

			$(this.SELECTORS.nav.buttons.resume).on(this.clickevent, function(){
				this.showPage('resume');
				this.setNavWidth();
				this.scrollTarget.scrollTop(0);
				this.resetCollapsableNav(this.scrollTarget);
			}.bind(this));

			//Set up click listeners for all project work buttons
			$(this.SELECTORS.projects.allbuttons).on(this.clickevent, function(e){

				//console.log('opening project');

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

				this.setNavWidth();
				this.scrollTarget.scrollTop(0);
				this.resetCollapsableNav(this.scrollTarget);

			}.bind(this));

			//Set up project nav buttons
			$(this.SELECTORS.projects.nav.close).on(this.clickevent, function(){
				this.showPage('portfolio');
				this.setNavWidth();
				this.scrollTarget.scrollTop(0);
				this.resetCollapsableNav(this.scrollTarget);
			}.bind(this));

			$(this.SELECTORS.resume.nav.close).on(this.clickevent, function(){
				this.showPage('portfolio');
				this.setNavWidth();
				this.scrollTarget.scrollTop(0);
				this.resetCollapsableNav(this.scrollTarget);
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

				this.setNavWidth();
				this.scrollTarget.scrollTop(0);
				this.resetCollapsableNav(this.scrollTarget);

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

				this.setNavWidth();
				this.scrollTarget.scrollTop(0);
				this.resetCollapsableNav(this.scrollTarget);

			}.bind(this));


			$( window ).resize(function() {
				this.setNavWidth();
				this.originalArrowSpacing = parseFloat($(this.SELECTORS.nav.buttons.labels).css('top'));
				if (this.scrollTarget != null) {
					this.onScroll(this.scrollTarget);
				}
			}.bind(this));

      //$(document).on('scroll', this.onScroll.bind(this));
      //console.log('scroll call');
      //
      this.originalArrowSpacing = parseFloat($(this.SELECTORS.nav.buttons.labels).css('top'));
      //
      $('.portfolio').on('scroll', function() {
				this.scrollTarget = $('.portfolio');
        this.onScroll($('.portfolio'));
      }.bind(this));

			$(this.SELECTORS.pages['resume-content']).on('scroll', function(e) {
				this.scrollTarget = $(e.target);
        //this.onScroll($(this.SELECTORS.projects.allcontent), $(this.SELECTORS.projects.nav.container));
        this.onScroll($(e.target));
      }.bind(this));

      $(this.SELECTORS.projects.allcontent).on('scroll', function(e) {
        this.scrollTarget = $(e.target);
				//this.onScroll($(this.SELECTORS.projects.allcontent), $(this.SELECTORS.projects.nav.container));
        this.onScroll($(e.target));
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
			var projectnum = id.replace(prefix, '');
			return projectnum;
		},

		addBrowserSpecificHexSpacing: function(){
			var hexesToBeSpaced = $('#project-grid li:nth-child(5n+5), #project-grid li:nth-child(5n+6), #project-grid li:nth-child(5n+7)');
			hexesToBeSpaced.css('margin-bottom','-21.5%');
		},

		// setupSteppedScrolling: function(){
		// 	this.stepsize = $('#' + this.SELECTORS.projects['button-id'] + '0').height();
		// 	//console.log(this.stepsize);
		// 	var scrollTo = 0;
		// 	var currentScrollTop = 0;

		// 	$(this.SELECTORS.main).on('scroll', this.onScroll.bind(this));
		// },

		setNavWidth: function(){

      var $doc = $(document.body);
      var $container = $(this.SELECTORS.nav.container);

			if ($('section.active').get(0).scrollHeight > $doc.innerHeight()) {
				$container.width($doc.width() - this.getScrollbarWidth());
			} else {
				$container.width($doc.width());
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
			var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;// +2 to try to fix spacing errors in chrome

			// Delete the DIV
			document.body.removeChild(scrollDiv);

			return scrollbarWidth;
		},

    updateCollapsableNav: function($element) {
       //console.log("scrolling");
      //console.log($element);

      var $nav = $(this.SELECTORS.nav.container);
      var $navControls = $(this.SELECTORS.projects.nav.container);


      var stepsize = $(this.SELECTORS.nav.buttons.all).height() * 0.5;
      var controlsStepsize = $(this.SELECTORS.nav.buttons.all).height() * 0.666;
      var upperBorderSize = $(this.SELECTORS.nav.buttons.all).height() * (0.33/2); //starting top percentage/2 = ending top percentage
      var newTop = $element.scrollTop();
      //var arrowTopSpacing = parseFloat($(this.SELECTORS.nav.buttons.labels).css('top'));

      if (newTop > 0) {
        if (!$nav.hasClass('minimising')) {
          $nav.addClass('minimising');
          $navControls.addClass('minimising');
        }
      } else {
				this.resetCollapsableNav($element);
				return;
      }

			// Minimising nav
      if (newTop < stepsize) {

        $nav.removeClass('minimised');
        $nav.css('top', -1 * newTop);

				// Main nav buttons arrow minimiser
				// Arrows only start moving down when the have the desired margin above them (upperBorderSize)
        if (newTop > upperBorderSize) {
          if (this.arrowScrollLimit == 0) {
            console.log(newTop);
            this.arrowScrollLimit = newTop;
          }

          $(this.SELECTORS.nav.buttons.labels).css('top', this.originalArrowSpacing + (newTop - this.arrowScrollLimit));

				// Do not move arrows down, allow them to move up page with scroll
        } else {

          this.arrowScrollLimit = 0;
          $(this.SELECTORS.nav.buttons.labels).css('top', this.originalArrowSpacing);

        }

			// Nav fully minimised
      } else {
				// Button height: Set to fully minimised size
				// Main nav buttons arrow minimiser: Set to final state
        if (!$nav.hasClass('minimised')) {
					$nav.css('top', -1 * stepsize);
					$(this.SELECTORS.nav.buttons.labels).css('top', this.originalArrowSpacing + (stepsize - upperBorderSize));
          $nav.addClass('minimised');
        }
				$nav.removeClass('minimising');
      }

			//Prev/Next Controls padding minimiser
      if (newTop < controlsStepsize) {
				
        $navControls.removeClass('minimised');
        $navControls.css('top', -1 * newTop);

      } else {
				// Minimising complete
				// Set to fully minimised size
        if (!$navControls.hasClass('minimised')) {
					$navControls.css('top', -1 * controlsStepsize);
          $navControls.addClass('minimised');
        }
				$navControls.removeClass('minimising');
      }

    },

		resetCollapsableNav: function($element) {

			  var $nav = $(this.SELECTORS.nav.container);
      	var $navControls = $(this.SELECTORS.projects.nav.container);

			  $nav.removeClass('minimising');
        $navControls.removeClass('minimising');
				$nav.removeClass('minimised');
				$navControls.removeClass('minimised');
				$navControls.css('top', '0');
				$nav.css('top', '0');
				//$(this.SELECTORS.nav.buttons.labels).css('top', this.originalArrowSpacing);
				$(this.SELECTORS.nav.buttons.labels).css('top', 'calc(50% - 25px)');
		},

    onScroll: function($element) {
      this.updateCollapsableNav($element);
    },

		// Hack to make the spacing work in safari due to the lack of subpixel rendering
		setHexSpacing: function () {
			if (navigator.userAgent.indexOf('Safari/') != -1 && navigator.userAgent.indexOf('Chromium/') == -1 && navigator.userAgent.indexOf('Chrome') == -1){
				var rule  = '@media (min-width: 780px) { #project-grid li {padding-bottom: 21.6% !important;}}';
				rule += '@media (min-width: 780px) {#project-grid li:nth-child(5n+5), #project-grid li:nth-child(5n+6), #project-grid li:nth-child(5n+7) {margin-bottom: -21.4% !important;}}';
				rule += '@media (min-width: 1000px) {#project-grid li:nth-child(5n+5), #project-grid li:nth-child(5n+6), #project-grid li:nth-child(5n+7) {margin-bottom: -21.5% !important;}}';
				rule += '.loading-screen .loading-hex .hexagon.inner {width: 115px !important;}';
				rule += '.loading-screen .loading-hex .hexagon.inner div:first-child {border-right-width: 28px !important;}';
				rule += '.loading-screen .loading-hex .hexagon.inner div:nth-child(2) {width: 58px !important;}';
				rule += '.loading-screen .loading-hex .hexagon.inner div:last-child {border-left-width: 28px !important;}';
				rule += '@media (max-width: 780px) AND (min-width: 420px){ .nav-button:nth-child(n+2) {margin-left: -40.5% !important;}}';
				cssEngine(rule);
			}

		}

	}

	ScreenManager.init();

});

function cssEngine(rule) {
  var css = document.createElement('style'); // Creates <style></style>
  css.type = 'text/css'; // Specifies the type
  if (css.styleSheet) css.styleSheet.cssText = rule; // Support for IE
  else css.appendChild(document.createTextNode(rule)); // Support for the rest
  document.getElementsByTagName('head')[0].appendChild(css); // Specifies where to place the css
}