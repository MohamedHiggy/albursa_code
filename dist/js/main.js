var emailInput;

function validateEmail(email) {
  var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return $.trim(email).match(pattern) ? true : false;
}
$("#email-input").on("change", function () {
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

