// filter in tenders page
$(document).ready(function() {
    $('.nav-filter .list-style .list button').click(function() {
        var CSSFilter = $(this).attr('id');
        if (CSSFilter === 'all') {
            console.log("asd")
            $('.content .Tenders-content > div ').fadeIn();
        } else {
            console.log("sadas")
            $('.content .Tenders-content > div ').fadeOut();
            $('.content .Tenders-content').contents().filter('.' + CSSFilter).fadeIn();
        }
    })
});

$(document).ready(function() {
    var $select1 = $('#select1'),
        $select2 = $('#select2'),
        $options = $select2.find('option');

    $select1.on('change', function() {
        $select2.html($options.filter('[value="' + this.value + '"]'));
    }).trigger('change');
});

// sidebar
$(function() {
    $(".toggle-sidebar").on("click", function() {
        $(".header .nav-resp").toggleClass("no-sidebar");
    });
    $(".show-filter").on("click", function() {
        $(".search-results .filter").toggleClass("no-filter");
    });
});

//change background color of checkbox 
$(function() {
    $('td:first-child input').change(function() {
        $(this).closest('tr').toggleClass("highlight", this.checked);
    });
});


// FAQ
$(document).ready(function() {
    $(".set > button").on("click", function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).siblings(".content").slideUp(200);
            $(".set > button i").removeClass("fa-angle-down").addClass("fa-angle-up");
        } else {
            $(".set > button i").removeClass("fa-angle-down").addClass("fa-angle-up");
            $(this)
                .find("i")
                .removeClass("fa-angle-up")
                .addClass("fa-angle-down");
            $(".set > button").removeClass("active");
            $(this).addClass("active");
            $(".content").slideUp(200);
            $(this).siblings(".content").slideDown(200);
        }
    })
});

// see all comments
$(document).ready(function() {
    $(".single-comment").slice(0, 3).show();
    $("#loadMore").click(function(e) {
        e.preventDefault();
        $(".single-comment:hidden").slice(0, 3).fadeIn("slow");

        if ($(".single-comment:hidden").length == 0) {
            $("#loadMore").fadeOut("slow");
        }
    });
})

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