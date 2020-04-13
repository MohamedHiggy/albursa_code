$(document).ready(function () {


  // filter in tenders page
  $('.nav-filter .list-style .list button').click(function () {

    $(this).addClass('active_btn_filter').siblings().removeClass('active_btn_filter');
    var CSSFilter = $(this).attr('id');
    if (CSSFilter === 'all') {
      $('.Tenders-content > div ').fadeIn();
    }
    else {
      $('.Tenders-content > div ').fadeOut();
      $('.Tenders-content').contents().filter('.' + CSSFilter).fadeIn();
    }
  });


  // add another tags


  var counter = 0;
  $('.form-group #add-tag').on('click', function () {
    counter++;
    $('#tagsAdded').append('<div class="form-group"><input type="text" class="form-control input-focus" placeholder=" tag ' + counter + ' "></div>');
  });
})


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


/*hide a navbar when the user starts to scroll the page
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-131px";
  }
  prevScrollpos = currentScrollPos;
} */

/*________________multi step form________________*/
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function () {
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
    step: function (now, mx) {
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
    complete: function () {
      current_fs.hide();
      animating = false;
    },
    //this comes from the custom easing plugin
    easing: 'easeInOutBack'
  });
});

$(".previous").click(function () {
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
    step: function (now, mx) {
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
    complete: function () {
      current_fs.hide();
      animating = false;
    },
    //this comes from the custom easing plugin
    easing: 'easeInOutBack'
  });
});

/*________________slider background________________*/

const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);

const nextBtn = document.querySelector(".carousel-btn-right");
const prevBtn = document.querySelector(".carousel-btn-left");

const dotsNav = document.querySelector(".carousel-nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

//arrange the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px'
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-img-slide");
  targetSlide.classList.add("current-img-slide")
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide")
  targetDot.classList.add("current-slide")
}

const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {

  if (targetIndex === 0) {
    prevBtn.classList.add("is-hidden");
    nextBtn.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevBtn.classList.remove("is-hidden");
    nextBtn.classList.add("is-hidden");
  } else {
    prevBtn.classList.remove("is-hidden");
    nextBtn.classList.remove("is-hidden")
  }
}

//click on next and prev btn
nextBtn.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-img-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);
  moveToSlide(track, currentSlide, nextSlide)
  updateDots(currentDot, nextDot)

  hideShowArrows(slides, prevBtn, nextBtn, nextIndex)
})

prevBtn.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-img-slide");
  const prevSlide = currentSlide.previousElementSibling;

  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;

  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide)
  updateDots(currentDot, prevDot)
  hideShowArrows(slides, prevBtn, nextBtn, prevIndex)
})

//detect the indecators
dotsNav.addEventListener("click", e => {
  const targetDot = e.target.closest("button");
  if (!targetDot) return;
  const currentSlide = track.querySelector(".current-img-slide");
  const currentDot = dotsNav.querySelector(".current-slide");

  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevBtn, nextBtn, targetIndex)
});