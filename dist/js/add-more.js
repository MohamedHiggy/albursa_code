$(document).ready(function() {
    var max_fields = 9;
    var wrapper = $(".add-product-content .add-more-tags-content");
    var add_button = $(
        ".add-product-content .form-row .form-group .add-more-tags"
    );
    var x = 1;
    $(add_button).click(function(e) {
        e.preventDefault();
        if (x < max_fields) {
            x++;
            $(wrapper).append(`<div class="form-row mb-2 mr-5">
                                    <div class="form-group col-lg-12 col-md-12 col-xs-12">
                                        <select class="form-control input-focus" id="featureSelect">
                                            <option value="Feature-1" selected>Feature 1</option>
                                            <option value="Feature-2">Feature 2</option>
                                            <option value="Feature-3">Feature 3</option>
                                        </select>
                                        <img src="../dist/icons/adminIcons/down-arrow.svg" alt="" class="select-arrow" />
                                    </div>
                                    <div class="form-group col-lg-12 col-md-12 col-xs-12">
                                        <input type="text" class="form-control input-focus" name='tags' id="available-items" placeholder="Available items" />
                                    </div>
                                    <button class="btn btn-danger btn-sm mb-2 ml-2 delete">Delete</button>
                                </div>`); //add input box
        } else {
            alert("You Reached the limits");
        }
    });

    $(wrapper).on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent("div").remove();
        x--;
    });
});

$(document).ready(function() {
    var max_fields = 9;
    var wrapper = $(".add-product-content .inputs-Internal");
    var add_button = $(
        ".add-product-content .form-row .form-group .add-more-Internal"
    );
    var x = 1;
    $(add_button).click(function(e) {
        e.preventDefault();
        if (x < max_fields) {
            x++;
            $(wrapper).append(`<div class="form-group col-lg-3 col-md-4 col-xs-6">
                                    <input type="text" class="form-control input-focus" placeholder="Internal amenities " name="mytext[]"/>
                                    <button class="btn btn-danger btn-sm mt-2 mb-2 delete">Delete</button>
                                </div>`); //add input box
        } else {
            alert("You Reached the limits");
        }
    });

    $(wrapper).on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent("div").remove();
        x--;
    });
});

$(document).ready(function() {
    var max_fields = 9;
    var wrapper = $(".add-product-content .inputs-External");
    var add_button = $(
        ".add-product-content .form-row .form-group .add-more-External"
    );
    var x = 1;
    $(add_button).click(function(e) {
        e.preventDefault();
        if (x < max_fields) {
            x++;
            $(wrapper).append(
                `<div class="form-group col-lg-3 col-md-4 col-xs-6"><input type="text" class="form-control input-focus" placeholder="External amenities " name="mytext[]"/><button class="btn btn-danger btn-sm mt-2 mb-2 delete">Delete</button></div>`
            ); //add input box
        } else {
            alert("You Reached the limits");
        }
    });

    $(wrapper).on("click", ".delete", function(e) {
        e.preventDefault();
        $(this).parent("div").remove();
        x--;
    });
});