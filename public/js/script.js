/* Author:

*/


var v6 = {
	options: {
		sidebar: $(".sidebar"),
		topPost: $(".list-top-posts"),
		topPostHeader: $(".list-top-posts .header"),
		contentLeft: $(".content-left")
	},

	// cambio de sub menu activo en paneles en el top
	activarSubMenu: function(e) {
		e.preventDefault();
		var elm = $(this);
		var panelIndex = elm.parent().index();
		var panel = elm.parent().parent().parent().find('.panel').eq(panelIndex);
		//var panel = elm.attr('href');
		elm.parent().parent().parent().find('.active').removeClass('active');
		elm.addClass('active');
		panel.addClass('active');
	},

	toggleEstadisticas: function(){
		var elm = $(this);
		elm.prev().toggleClass("active");
		elm.toggleClass("active"); 
	},
	returnFalse: function(e) { 
		e.preventDefault();	
	},
	actionIn: function() {
		$(this).find('ol').show();
	},
	actionOut: function() {
		$(this).find('ol').hide();
	},
	actionSelect: function() {
		var elm = $(this);
		var select = $(this).parent().parent().parent();
		select.find('li.active').removeClass('active');
		elm.parent().addClass('active');
		select.find('ol').hide();
		select.find('span').html(elm.text());
	},
	actionMinMax: function() {
		var elm = $(this);
		elm.find('span').toggleClass('active');
		elm.parent().find('ul').slideToggle();
	},
	removeBetaMsg: function() {
		$('body').removeClass('beta');

		setTimeout(function() {
			v6.options.topPostHeight			= v6.options.topPost.outerHeight();
			v6.options.topPostTop					= v6.options.topPost.offset().top;
			v6.options.contentRightWidth	= v6.options.contentRight.width();
			v6.options.sidebarOffsetLeft	= v6.options.content.outerWidth() + v6.options.content.offset().left - v6.options.sidebar.outerWidth();
			v6.options.winHeight					= $(window).height();
			v6.options.docHeight					= $(document).height();
			v6.options.sidebarHeight			= v6.options.sidebar.outerHeight();
			// fix sidebar
			v6.fixSidebar(v6.options);
			// fix columna secundaria
			v6.fixTopPosts(v6.options);
		},500);
	},
	shoutShow: function(e) {
		e.stopPropagation();
		$('#tool-shout').show();
		$('#tool-notificaciones, #tool-mensajes, #tool-favoritos').addClass('hide');
	},
	shoutHide: function() {
		$('#tool-shout').hide();
	},
	shoutStep2: function(e) {
		e.stopPropagation();
		$('#tool-shout .step3').hide();
		$('#tool-shout .step2').show();
	},
	shoutStep3: function(e) {
		e.preventDefault();
		e.stopPropagation();
		$('#tool-shout .step2').hide();
		$('#tool-shout .step3').show();
	},
	shoutLock: function(e) {
		e.stopPropagation();
		console.log('pasa');
		$(this).next().toggleClass('hide');
	},

	fixSidebar: function(options) {
		if ($(window).scrollTop() > options.sidebarHeight - options.winHeight + parseInt($('body').css('padding-top'))  ){

      options.sidebar.css(
				{ 'left': options.sidebarOffsetLeft - $(window).scrollLeft()
	      , 'right': 'auto'
				,	'position': 'fixed'
				, 'bottom': 0
				}
			);
    } else {
      options.sidebar.css(
				{ 'position': 'relative' 
				, 'left': 'auto'
				, 'right': 'auto'
				, 'bottom': 'auto'
				}
			);
    }
	},
	fixTopPosts: function(options) {
		var bodyPaddingTop = 0; //parseInt($('body').css('padding-top')) - 1;
		var topPostFixHeader = options.topPostTop - bodyPaddingTop;
		var topPostFixContent = options.topPostHeight + options.topPostTop - options.winHeight;
		//console.log($(window).scrollTop() + '>=' + topPostFixHeader + '&&' + (options.winHeight - bodyPaddingTop) + '>' + options.topPostHeight);
		
		if ($(window).scrollTop() >= topPostFixContent && options.winHeight - bodyPaddingTop <= options.topPostHeight ){
      options.topPost.css(
				{ 'position': 'fixed'
				, 'left': options.contentRight.offset().left - $(window).scrollLeft()
				, 'bottom': '10px'
				, 'width': options.contentRightWidth
				}
			);
    } else {
      options.topPost.css(
				{ 'position': 'static'
				, 'width': 'auto'
				, 'left': 'auto'
				, 'bottom': 'auto'
				}
			);
    }

		if ($(window).scrollTop() >= topPostFixHeader && options.winHeight - bodyPaddingTop > options.topPostHeight ){
			options.topPost.css(
				{ 'position': 'fixed'
				, 'left': options.contentRight.offset().left - $(window).scrollLeft()
				//, 'top': bodyPaddingTop
				, 'top': '0'
				, 'width': options.contentRightWidth
				}
			);
		} else if ($(window).scrollTop() >= topPostFixHeader && options.winHeight - bodyPaddingTop < options.topPostHeight ){
      options.topPostHeader.css(
				{ 'position': 'fixed'
				, 'left': options.contentRight.offset().left - $(window).scrollLeft()
				//, 'top': bodyPaddingTop
				, 'top': '0'
				, 'width': options.contentRightWidth
				, 'border': 'solid 1px #d0d1d3'
				}
			);
    } else {
      options.topPostHeader.css(
				{ 'position': 'static' 
				, 'border': 'none'
				, 'width': 'auto'
				, 'left': 'auto'
				, 'top': 'auto'
				}
			);
			options.topPost.css(
				{ 'position': 'static'
				, 'width': 'auto'
				, 'left': 'auto'
				, 'bottom': 'auto'
				}
			);
    }
		
	},
	getContent: function(options) {
		var bodyPaddingTop = parseInt($('body').css('padding-top'));
		if ($(window).scrollTop() + options.winHeight > options.contentLeft.height() + bodyPaddingTop + 50 && !v6.loadingAjax){
			v6.loadingAjax = true;
			options.contentLeft.find('.loading').show();
			$.get( "ajax_content.html", function(data) {
			  options.contentLeft.find('.loading').hide();
			  options.contentLeft
			  	.find('ul').append(data)
			  	.find('.added').hide()
			  	.fadeIn('slow', function(){
				  		v6.loadingAjax = false;
							v6.options.docHeight					= $(document).height();
				  }).removeClass('added');
			});
		}
	},
	headerScroll: function() {
		if($(window).scrollTop() > 1) {
			$('header').addClass('scroll');
		} else {
			$('header').removeClass('scroll');
		}
	}
}
$(window).load(function() {
	v6.options.sidebar 						= $(".sidebar");
	v6.options.topPost						= $(".list-top-posts");
	v6.options.topPostHeader			= $(".list-top-posts .header");
	v6.options.topPostContent			= $(".list-top-posts ul");
	v6.options.content 						= $(".v6-container");
	v6.options.contentRight 			= $(".content-right");
	v6.options.contentLeft 				= $(".content-left");
	v6.options.topPostHeight			= v6.options.topPost.outerHeight();
	v6.options.topPostTop					= v6.options.topPost.offset().top;
	v6.options.contentRightWidth	= v6.options.contentRight.width();
	v6.options.sidebarOffsetLeft	= v6.options.content.outerWidth() + v6.options.content.offset().left - v6.options.sidebar.outerWidth();
	v6.options.winHeight					= $(window).height();
	v6.options.docHeight					= $(document).height();
	v6.options.sidebarHeight			= v6.options.sidebar.outerHeight();

	// fix sidebar
	v6.fixSidebar(v6.options);
	// fix columna secundaria
	v6.fixTopPosts(v6.options);

})

$(window).scroll(function() {
	// fix sidebar
	v6.fixSidebar(v6.options);
	// fix columna secundaria
	v6.fixTopPosts(v6.options);

	// carga de contenido por ajax
	v6.getContent(v6.options);

	// sombra en el header
	v6.headerScroll();
});

$(window).resize(function () {
	v6.options.topPostHeight			= v6.options.topPost.outerHeight();
	v6.options.topPostTop					= v6.options.topPost.offset().top;
	v6.options.contentRightWidth	= v6.options.contentRight.width();
	v6.options.sidebarOffsetLeft	= v6.options.content.outerWidth() + v6.options.content.offset().left - v6.options.sidebar.outerWidth();
	v6.options.winHeight					= $(window).height();
	v6.options.docHeight					= $(document).height();
	v6.options.sidebarHeight			= v6.options.sidebar.outerHeight();
	// fix sidebar
	v6.fixSidebar(v6.options);
	// fix columna secundaria
	v6.fixTopPosts(v6.options);
})

$(function(){
	
	//evento para activa el submenu  de los paneles
	$('.nav-principal .subnav a').hover(v6.activarSubMenu);

	// evento para anular los link con #
	$('[href="#"]').click(v6.returnFalse);

	// evento para el desplegable
	$("aside .estadisticas .bt-slide").click(v6.toggleEstadisticas);

	// action select
	$(".action-select").hover(v6.actionIn,v6.actionOut);
	$(".action-select li a").click(v6.actionSelect);
	
	// action min max
	$(".action-minmax").click(v6.actionMinMax);

	// mensaje de beta
	$(".beta-msg a").click(v6.removeBetaMsg);
	setTimeout(v6.removeBetaMsg,10000); 

	$(".timeago").timeago();

	// navegacion shout
	$('.ico-shout').click(v6.shoutShow);
	$('html').click(v6.shoutHide);
	$('#tool-shout .link, #tool-shout .ico-video, #tool-shout .importar-url').click(v6.shoutStep2);
	$('#tool-shout .add').click(v6.shoutStep3);
	$('.ico-lock').click(v6.shoutLock);
	$('.ico-camera').click(v6.shoutLock);

	// temporal para pruebas
	$('.buscar').click(function(){
		$('.box-results').toggleClass('hide');
	});

	$('.user-action span.user-name').hover(function(){
		$('#tool-profile').toggleClass('hide');
	});

	// temporal para notificaciones
	$('.ico-notificaciones').click(function(e){
		e.preventDefault();
		$(this).parent().parent().find('#tool-mensajes').addClass('hide');
		$(this).parent().parent().find('#tool-favoritos').addClass('hide');
		$(this).parent().find('#tool-notificaciones').toggleClass('hide');
	});
	$('.ico-mensajes').click(function(e){
		e.preventDefault();
		$(this).parent().parent().find('#tool-notificaciones').addClass('hide');
		$(this).parent().parent().find('#tool-favoritos').addClass('hide');
		$(this).parent().find('#tool-mensajes').toggleClass('hide');
	});
	$('.ico-favoritos').click(function(e){
		e.preventDefault();
		$(this).parent().parent().find('#tool-notificaciones').addClass('hide');
		$(this).parent().parent().find('#tool-mensajes').addClass('hide');
		$(this).parent().find('#tool-favoritos').toggleClass('hide');
	});


	$('.list-destacados li').click(function(e){
	 e.stopPropagation()
	 window.location = $(this).find('a').attr('href');
	});


	if ($(window).width() > 1160) {
	   $("#branday .btn").click(function() {
		if ($(".v6-banner-top").height()>55) {
			$(".v6-banner-top").animate({"height": "55px"},"slow");
			$(".v6-banner-top").addClass('alto');
			$(this).addClass('cerrar');
		} else {
			$(".v6-banner-top").animate({"height": "241px"},"slow");
			$(".v6-banner-top").removeClass('alto');
			$(this).removeClass('cerrar');
		}
	    
		});
	}
	else {
	   $("#branday .btn").click(function() {
		if ($(".v6-banner-top").height()>55) {
			$(".v6-banner-top").animate({"height": "55px"},"slow");
			$(".v6-banner-top").addClass('alto');
			$(this).addClass('cerrar');
		} else {
			$(".v6-banner-top").animate({"height": "200px"},"slow");
			$(".v6-banner-top").removeClass('alto');
			$(this).removeClass('cerrar');
		}
	    
		});
	}

	$('footer p.subir').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	

})
