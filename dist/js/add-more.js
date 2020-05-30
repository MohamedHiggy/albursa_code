var x = 1;

function education_fields() {
    x++;
    var objTo = document.getElementById("education_fields");
    var divtest = document.createElement("div");
    divtest.setAttribute("class", "form-group col-lg-12 col-md-12 col-xs-12 f" + x);
    var rdiv = "f" + x;
    divtest.innerHTML = '<div class="form-group col-lg-8 col-md-8 col-xs-12"> <select class="form-control input-focus"><option value="Feature-1" selected>Feature 1</option><option value="Feature-2">Feature 2</option> <option value="Feature-3">Feature 3</option></select><img src="../dist/icons/adminIcons/down-arrow.svg" alt="" class="select-arrow" /></div><div class="form-group col-lg-8 col-md-8 col-xs-12 sss"><input type="text" class="form-control input-focus" id="available-items" placeholder="Available items" /><button class="btn btn-delete-row" type="button" onclick="remove_education_fields(' + x + ');"> <i class="fa fa-times"></i> </button></div>';

    objTo.appendChild(divtest);
}

function remove_education_fields(rid) {
    $(".f" + rid).remove();
}