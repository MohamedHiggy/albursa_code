// filter in tenders page
$(document).ready(function() {
    $('.nav-filter .list-style .list button').click(function() {
        $(this).addClass('active_btn_filter').siblings().removeClass('active_btn_filter');
        var CSSFilter = $(this).attr('id');
        if (CSSFilter === 'all') {
            $('.Tenders-content > div ').fadeIn();
        } else {
            $('.Tenders-content > div ').fadeOut();
            $('.Tenders-content').contents().filter('.' + CSSFilter).fadeIn();
        }
    })
});
$(function() {
    $(".toggle-sidebar").on("click", function() {
        $(".header .nav-resp").toggleClass("no-sidebar");
    });
    $(".show-filter").on("click", function() {
        $(".search-results .filter").toggleClass("no-filter");
    });
});

// add another tags
$(document).ready(function() {
    var counter = 0;
    $('.form-group #add-tag').on('click', function() {
        counter++;
        $('#tagsAdded').append('<div class="form-group"><input type="text" class="form-control input-focus" placeholder=" tag ' + counter + ' "></div>');
    });
});

// FAQ
$(document).ready(function() {
    $(".set > a").on("click", function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).siblings(".content").slideUp(200);
            $(".set > a i").removeClass("fa-angle-down").addClass("fa-angle-up");
        } else {
            $(".set > a i").removeClass("fa-angle-down").addClass("fa-angle-up");
            $(this)
                .find("i")
                .removeClass("fa-angle-up")
                .addClass("fa-angle-down");
            $(".set > a").removeClass("active");
            $(this).addClass("active");
            $(".content").slideUp(200);
            $(this).siblings(".content").slideDown(200);
        }
    })
});

//slider
$(document).ready(function() {
    $(".slider").slick({
        infinite: true,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
        prevArrow: '<button class="arrow-btn PrevArrow">  <img src="dist/icons/right-arrow.svg" ></button>',
        nextArrow: '<button class="arrow-btn NextArrow"><img src="dist/icons/left-arrow.svg" ></button>',
        fadeSpeed: 2000,
    })
});


/*________________multi step form________________*/
$(document).ready(function() {
    //jQuery time
    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches

    $(".next").click(function() {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50) + "%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale(' + scale + ')',
                    'position': 'absolute'
                });
                next_fs.css({ 'left': left, 'opacity': opacity });
            },
            duration: 600,
            complete: function() {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    });

    $(".previous").click(function() {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //de-activate current step on progressbar
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();
        //hide the current fieldset with style
        current_fs.animate({ opacity: 0 }, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale previous_fs from 80% to 100%
                scale = 0.8 + (1 - now) * 0.2;
                //2. take current_fs to the right(50%) - from 0%
                left = ((1 - now) * 50) + "%";
                //3. increase opacity of previous_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({ 'left': left });
                previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
            },
            duration: 600,
            complete: function() {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    });

});

//validateEmail
$(document).ready(function() {
    var emailInput;

    function validateEmail(email) {
        var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return $.trim(email).match(pattern) ? true : false;
    }
    $("#email-input").on("change", function() {
        emailInput = $(this).val();
        if (validateEmail(emailInput)) {
            $(this).css({
                border: "2px solid green"
            });
        } else {
            $(this).css({
                border: "2px solid red"
            });
        }
    });
});


//slider-range-price
$(function() {
    var $slider = $("#slider-range");
    //Get min and max values
    var priceMin = $slider.attr("data-price-min"),
        priceMax = $slider.attr("data-price-max");

    //Set min and max values where relevant
    $("#price-filter-min, #price-filter-max").map(function() {
        $(this).attr({
            "min": priceMin,
            "max": priceMax
        });
    });
    $("#price-filter-min").attr({
        "placeholder": "min " + priceMin,
        "value": priceMin
    });
    $("#price-filter-max").attr({
        "placeholder": "max " + priceMax,
        "value": priceMax
    });

    $slider.slider({
        range: true,
        min: Math.max(priceMin, 0),
        max: priceMax,
        values: [priceMin, priceMax],
        slide: function(event, ui) {
            // $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
            $("#price-filter-min").val(ui.values[0]);
            $("#price-filter-max").val(ui.values[1]);
        }
    });

    $("#price-filter-min, #price-filter-max").map(function() {
        $(this).on("input", function() {
            updateSlider();
        });
    });

    function updateSlider() {
        $slider.slider("values", [$("#price-filter-min").val(), $("#price-filter-max").val()]);
    }

});

$(function() {
    var creditly = Creditly.initialize(
        "#ExpDate",
    );
    $(".payment__confirm").click(function(e) {
        e.preventDefault();
        var output = creditly.validate();
        $ele = $("#ExpDate");
        var today = new Date();
        if (output) {
            // Your validated credit card output
            console.log(output);
            if (output.expiration_year > today.getFullYear()) {
                $ele.next().show().text("Card is expired.");
            } else {
                $ele.next().hide();
            }
        }
    });
});

$(document).ready(function() {
    $("#datepicker").datepicker({
        dateFormat: "dd-mm-yy",
        duration: "fast",
    });
});


$(document).ready(function() {
    $(" .btn-love").click(function() {
        $(this).text($(this).text() == 'Saved' ? 'Save' : 'Saved');
        $(this).toggleClass("btn-love-toggle");
    });
});

$(document).ready(function() {
    $(" select ,.form-control").change(function() {
        $(".send-data").removeAttr("disabled");
    });
});



//tabs of active link
const tabsLink = document.querySelectorAll(
    ".profile-content .tabs .list-style .list .btn-tab"
);
tabsLink.forEach((clickedTab) => {
    clickedTab.addEventListener("click", () => {
        tabsLink.forEach((tabLink) => {
            tabLink.classList.remove("active-tab");
        });
        clickedTab.classList.add("active-tab");
    });
});
//tabs of content
const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.tabTarget);
        tabContents.forEach((tabContent) => {
            tabContent.classList.remove("tab-active");
        });
        target.classList.add("tab-active");
    });
});

$(document).ready(function() {
    // Show the first tab and hide the rest
    $('.vendor-tabs .list-style .list:first-child').addClass('current');
    $('.vendor-tabs-content .div-tab').hide();
    $('.vendor-tabs-content .div-tab:first').show();

    // Click function
    $('.vendor-tabs .list-style .list').click(function() {
        $('.vendor-tabs .list-style .list').removeClass('current');
        $(this).addClass('current');
        $('.vendor-tabs-content .div-tab').hide();

        var activeTab = $(this).find('span').attr('data-tab');
        $(activeTab).fadeIn();
        return false;
    });
});