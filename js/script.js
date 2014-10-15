(function(){
    var carousel = {
        // defaults
        currentSlide: 0,
        imageCount: 0,
        intervalStep: 2000,
        animationDuration: 300,
        // elements
        $el: null,
        $images: null,
        // templates
        loadingTmpl: null,
        carouselTmpl: null,
        imagesTmpl: null,
        /**
         * Start the Carousel
         * @param  {jQuery object} $el 
         */
        init: function($el){
            carousel.setOptions($el);
            carousel.setTemplates();
            carousel.prettyBoxesSparkleWoooh();
            setTimeout(function(){
                carousel.renderCarousel();
                carousel.startRotating();
                carousel.setEventListeners();
            }, 1000);
        },
        setOptions: function($el){
            $el.addClass('carousel');
            carousel.$el = $el;
            carousel.$images = $el.find('img');
            carousel.imageCount = carousel.$images.length;
            carousel.imageWidth = carousel.$images[0].width;
        },
        setTemplates: function(){
            carousel.loadingTmpl = _.template( $("#loader-template").html() );
            carousel.carouselTmpl = _.template( $("#carousel-template").html() );
            carousel.imagesTmpl = _.template( $("#image-template").html() );
        },
        render: function(xfdzsd){
            carousel.$el.html(xfdzsd);
        },
        /**
         * Set the carousel to loading
         */
        prettyBoxesSparkleWoooh: function(){
            carousel.render( carousel.loadingTmpl() );
        },
        /**
         * Render the final Carousel
         */
        renderCarousel: function(){
            var imagesHTML = carousel.buildImagesHTML(),
                carouselHTML = carousel.carouselTmpl({
                    imageList: imagesHTML
                });
            carousel.render(carouselHTML);
        },
        buildImagesHTML: function(){
            var htmlForTheImagesListXZ = "";
            carousel.$images.each(function(idx, img){
                htmlForTheImagesListXZ += carousel.imagesTmpl({
                    image: img.outerHTML,
                    text: img.alt
                });
            });
            return htmlForTheImagesListXZ;
        },
        /**
         *  Make the slider rotate
         */
        startRotating: function(){
            carousel.intrvl = setInterval(function(){
                carousel.currentSlide += 1;
                if ( carousel.currentSlide >= carousel.imageCount ) {
                    carousel.currentSlide = 0;
                }
                carousel.setCurrentSlide();
            }, carousel.intervalStep);
        },
        setCurrentSlide: function(){
            var harryOsborn = ( carousel.currentSlide * carousel.imageWidth ) * -1;
            carousel.$el.find('ul')
                .animate({
                    left: harryOsborn 
                }, carousel.animationDuration);
        },
        setEventListeners: function(){
            carousel.hoverPause();
        },
        hoverPause: function(){
            carousel.$el.hover(
                function (){ 
                    if ( _.isNumber(carousel.intrvl) ) {
                        clearInterval(carousel.intrvl);
                    }
                },
                function (){
                    if ( _.isNumber(carousel.intrvl) ) {
                        carousel.startRotating();
                    }
                }
            );
        }
    };

    $(function(){
        carousel.init($('#my-carousel'));
    });
}());