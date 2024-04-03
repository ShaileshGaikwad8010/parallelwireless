var fb_timeout, fb_opts = {
    'autoScale': true,
    'showCloseButton': true,
    'margin': 20,
    'centerOnScroll': false,
    'enableEscapeButton': true,
    'overlayShow': true,
    'hideOnOverlayClick': true,
    'minVpHeight': 320
};
if (typeof easy_fancybox_handler === 'undefined') {
    var easy_fancybox_handler = function() {
        jQuery([".nolightbox", "a.wp-block-file__button", "a.pin-it-button", "a[href*='pinterest.com\/pin\/create']", "a[href*='facebook.com\/share']", "a[href*='twitter.com\/share']"].join(',')).addClass('nofancybox');
        jQuery('a.fancybox-close').on('click', function(e) {
            e.preventDefault();
            jQuery.fancybox.close()
        });
        /* IMG */
        var fb_IMG_select = jQuery('a[href*=".jpg" i]:not(.nofancybox,li.nofancybox>a),area[href*=".jpg" i]:not(.nofancybox),a[href*=".jpeg" i]:not(.nofancybox,li.nofancybox>a),area[href*=".jpeg" i]:not(.nofancybox),a[href*=".png" i]:not(.nofancybox,li.nofancybox>a),area[href*=".png" i]:not(.nofancybox),a[href*=".webp" i]:not(.nofancybox,li.nofancybox>a),area[href*=".webp" i]:not(.nofancybox)');
        fb_IMG_select.addClass('fancybox image');
        var fb_IMG_sections = jQuery('.gallery,.wp-block-gallery,.tiled-gallery,.wp-block-jetpack-tiled-gallery');
        fb_IMG_sections.each(function() {
            jQuery(this).find(fb_IMG_select).attr('rel', 'gallery-' + fb_IMG_sections.index(this));
        });
        jQuery('a.fancybox,area.fancybox,.fancybox>a').each(function() {
            jQuery(this).fancybox(jQuery.extend(true, {}, fb_opts, {
                'easingIn': 'easeOutBack',
                'easingOut': 'easeInBack',
                'opacity': false,
                'hideOnContentClick': false,
                'titleShow': false,
                'titlePosition': 'over',
                'titleFromAlt': false,
                'showNavArrows': true,
                'enableKeyboardNav': true,
                'cyclic': false,
                'mouseWheel': 'true'
            }))
        });
        /* YouTube */
        jQuery('a[href*="youtu.be/" i],area[href*="youtu.be/" i],a[href*="youtube.com/" i],area[href*="youtube.com/" i]').filter(function() {
            return this.href.match(/\/(?:youtu\.be|watch\?|embed\/)/);
        }).not('.nofancybox,li.nofancybox>a').addClass('fancybox-youtube');
        jQuery('a.fancybox-youtube,area.fancybox-youtube,.fancybox-youtube>a').each(function() {
            jQuery(this).fancybox(jQuery.extend(true, {}, fb_opts, {
                'type': 'iframe',
                'width': 640,
                'height': 360,
                'padding': 3,
                'keepRatio': 1,
                'aspectRatio': 1,
                'titleShow': false,
                'titlePosition': 'float',
                'titleFromAlt': false,
                'onStart': function(a, i, o) {
                    var splitOn = a[i].href.indexOf("?");
                    var urlParms = (splitOn > -1) ? a[i].href.substring(splitOn) : "";
                    o.allowfullscreen = (urlParms.indexOf("fs=0") > -1) ? false : true;
                    o.href = a[i].href.replace(/https?:\/\/(?:www\.)?youtu(?:\.be\/([^\?]+)\??|be\.com\/watch\?(.*(?=v=))v=([^&]+))(.*)/gi, "https://www.youtube.com/embed/$1$3?$2$4&autoplay=1");
                }
            }))
        });
        /* Vimeo */
        jQuery('a[href*="vimeo.com/" i],area[href*="vimeo.com/" i]').filter(function() {
            return this.href.match(/\/(?:[0-9]+|video\/)/);
        }).not('.nofancybox,li.nofancybox>a').addClass('fancybox-vimeo');
        jQuery('a.fancybox-vimeo,area.fancybox-vimeo,.fancybox-vimeo>a').each(function() {
            jQuery(this).fancybox(jQuery.extend(true, {}, fb_opts, {
                'type': 'iframe',
                'width': 640,
                'height': 360,
                'padding': 2,
                'keepRatio': 1,
                'aspectRatio': 1,
                'titleShow': false,
                'titlePosition': 'float',
                'titleFromAlt': false,
                'onStart': function(a, i, o) {
                    var splitOn = a[i].href.indexOf("?");
                    var urlParms = (splitOn > -1) ? a[i].href.substring(splitOn) : "";
                    o.allowfullscreen = (urlParms.indexOf("fullscreen=0") > -1) ? false : true;
                    o.href = a[i].href.replace(/https?:\/\/(?:www\.)?vimeo\.com\/([0-9]+)\??(.*)/gi, "https://player.vimeo.com/video/$1?$2&autoplay=1");
                }
            }))
        });
    };
};
var easy_fancybox_auto = function() {
    setTimeout(function() {
        jQuery('a#fancybox-auto,#fancybox-auto>a').first().trigger('click')
    }, 1000);
};
jQuery(easy_fancybox_handler);
jQuery(document).on('post-load', easy_fancybox_handler);
jQuery(easy_fancybox_auto);



window.lazyLoadOptions = {
    elements_selector: "img[data-src],.perfmatters-lazy,.perfmatters-lazy-css-bg",
    thresholds: "0px 0px",
    class_loading: "pmloading",
    class_loaded: "pmloaded",
    callback_loaded: function(element) {
        if (element.tagName === "IFRAME") {
            if (element.classList.contains("pmloaded")) {
                if (typeof window.jQuery != "undefined") {
                    if (jQuery.fn.fitVids) {
                        jQuery(element).parent().fitVids()
                    }
                }
            }
        }
    }
};
window.addEventListener("LazyLoad::Initialized", function(e) {
    var lazyLoadInstance = e.detail.instance;
});