// =========================================== Window Size ========================================
var win_scroll = 0;
var win_width = 0;
var win_height = 0;

// ============================================ Global Tags ===============================
var header = $("#header");
var headerHeight = header.height();
var footer = $("#footer");

// =========================================== Main Section ========================================
var mainSection = function(sectionId) {
    $(sectionId).css("height", win_height - headerHeight + "px");
    if (win_scroll >= 0) {
        $(sectionId).addClass('anim-block');
    }
};

var sections = $('main > section');
var sectionCount = sections.length;
var sectionPositionTop = [];
var index = 0;

var sectionOffsetTop = function() {
    sections.each(function(i) {
        var offset = $(this).offset();
        sectionPositionTop[i] = offset.top;
    });

    for(var i = 0; i < sectionCount; i++) {
        if (win_scroll >= sectionPositionTop[i]) {
            sections.eq(i).addClass('anim-block');
        }
    }
};

var sectionIndex = function() {
    for(var i = 0; i < sectionCount; i++) {
        if (win_scroll >= sectionPositionTop[i] && win_scroll <= sectionPositionTop[i+1]) {
            index = i+1;
        }
    }
    return index;
};

var sectionAnimation = function() {
    sections.eq(sectionIndex()).addClass('anim-block');
};

// ============================================ Scroll Header =====================================
var scrollHeader = function() {
    if (win_scroll > 50) {
        header.addClass("header_scroll");
    } else {
        header.removeClass("header_scroll");
    }
};
// ============================================ Main Menu =====================================
var btnMenu = $('#btnMenu');
var menu = $('#mainMenu');

var mainMenuClose = function() {
    menu.removeClass('active');
    btnMenu.removeClass('active');
};
var mainMenuOpen = function() {
    menu.addClass('active');
    btnMenu.addClass('active');
};

var mainMenu = function() {
    btnMenu.on('click', function() {
        if($(this).hasClass('active')) {
            mainMenuClose();
        } else {
            mainMenuOpen();
        }
    });

    $(document).mouseup(function (e){
        if (!menu.is(e.target) && !btnMenu.is(e.target) && menu.has(e.target).length === 0 ) {
            mainMenuClose();
        }
    });
};

// =========================================== Form - validation =======================================
$.validator.addMethod("customemail",
    function(value, element) {
        return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
    },
    "Invalid email"
);
$.validator.addMethod("uname",
    function(value, element) {
        return (/^([a-z]\w*)$/ig).test(value);
    },
    "Invalid user name"
);
$.validator.addMethod("pass",
    function(value, element) {
        return (/^([A-Z0-9-_!@$&()])+$/ig).test(value);
    },
    "Invalid password"
);
$.validator.addMethod("enonly",
    function(value, element) {
        if(value == '') {
            return true;
        }
        return (/^([A-Z0-9-_ .,])+$/ig).test(value);
    },
    "Invalid value"
);
$.validator.addMethod("enletter",
    function(value, element) {
        if(value == '') {
            return true;
        }
        return (/^([A-Z-_ ])+$/ig).test(value);
    },
    "Invalid value"
);
$.validator.addMethod("nphone",
    function(value, element) {
        if(value == '') {
            return true;
        }
        return (/^[+0-9() -]{14,20}$/i).test(value);
    },
    "Invalid phone"
);

// ============================================ Form =====================================
var form = function(formContact) {
    $(formContact + " input").change(function(){
        $(this).val($.trim($(this).val()));
    });
    $(formContact).validate({
        rules: {
            "Form[email]": {
                required: true,
                customemail: true
            },
            "Form[ssn]": {
                required: true,
                minlength: 4,
                enonly: true
            },
            "Form[zip]": {
                required: true,
                enonly: true
            }
        },
        errorElement: "span",
        errorClass: "invalid",
        validClass: "valid",
        submitHandler: function(form) {
            alert("Send form");
            form.submit();
        }
    });
};

// =========================================== Document Ready ======================================
$(document).ready(function() {
    // Sections
    mainSection();
    // Main Menu
    mainMenu();
    // Form
    form("#formGetStarted");

    $(".form-step1 .btn").on('click', function() {
        $(".form-step1").hide();
        $(".form-step2").show();
    });

    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - headerHeight
                }, 1000);
                return false;
            }
        }
    });
});

// =========================================== Window Resize and Document Ready ====================
var callback = function() {
    win_width = window.innerWidth;
    win_height = window.innerHeight;

    scrollHeader();
    mainSection('#sectionMain');
    sectionOffsetTop();

    var slide = $('.tiles-slide');
    slide.css({height: slide.find('.image').height() + 'px'});
};

// =========================================== Window Scroll ====================
var callbackScroll = function() {
    win_scroll = $(this).scrollTop();

    scrollHeader();
    mainSection('#sectionMain');
    sectionAnimation();
};

$(document).ready(callback);
$(window).resize(callback);
$(window).scroll(callbackScroll);