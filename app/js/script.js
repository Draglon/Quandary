// =========================================== Window Size ========================================
var win_scroll = 0;
var win_width = 0;
var win_height = 0;

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
    $('#asidePanelBtn').on('click', function() {
        $(this).toggleClass("active");
        $('.aside').toggleClass("active");
    });
});

// =========================================== Window Resize and Document Ready ====================
var callback = function() {
    win_width = window.innerWidth;
    win_height = window.innerHeight;
};

// =========================================== Window Scroll ====================
var callbackScroll = function() {
    win_scroll = $(this).scrollTop();
};

$(document).ready(callback);
$(window).resize(callback);
$(window).scroll(callbackScroll);