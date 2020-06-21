var feedbackButton = document.querySelector(".contact-block__button");
var feedbackPopup = document.querySelector(".modal-feedback");
var feedbackClose = feedbackPopup.querySelector(".modal-close");
var feedbackForm = feedbackPopup.querySelector(".feedback__form");
var feedbackName = feedbackPopup.querySelector("input[name='feedback-name']");
var feedbackEmail = feedbackPopup.querySelector("input[name='feedback-email']");
var feedbackMessage = feedbackPopup.querySelector("textarea[name='feedback-message']");
var overlay = document.querySelector(".overlay");

var sliderColors = ["green", "gray", "brown"];
var sliderControls = document.querySelectorAll(".main-slider__controls button");
var sliderItems = document.querySelectorAll(".main-slider__item");
var pageBackground = document.querySelector(".page");

var isStorageSupport = true;
var storage = [];

try {
  storage["name"] = localStorage.getItem("name");
  storage["email"] = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

feedbackButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  feedbackPopup.classList.add("modal-feedback--open");
  overlay.classList.add("overlay--open");

  if (storage["name"] && storage["email"]) {
    feedbackName.value = storage["name"];
    feedbackEmail.value = storage["email"];
    feedbackMessage.focus();
  } else if (storage["name"]) {
    feedbackName.value = storage["name"];
    feedbackEmail.focus();
  } else if (storage["email"]) {
    feedbackEmail.value = storage["email"];
    feedbackName.focus();
  }
});

feedbackClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  feedbackPopup.classList.remove("modal-feedback--open");
  feedbackPopup.classList.remove("modal-feedback--error");
  overlay.classList.remove("overlay--open");
});

feedbackForm.addEventListener("submit", function (evt) {
  if (!feedbackName.value || !feedbackEmail.value) {
    evt.preventDefault();
    feedbackPopup.classList.remove("modal-feedback--error");
    overlay.classList.remove("overlay--open");
    feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;
    feedbackPopup.classList.add("modal-feedback--error");
    overlay.classList.add("overlay--open");
  } else {
    evt.preventDefault();
    if (isStorageSupport) {
      localStorage.setItem("name", feedbackName.value);
      localStorage.setItem("email", feedbackEmail.value);
    }
    feedbackPopup.classList.remove("modal-feedback--open");
    feedbackPopup.classList.remove("modal-feedback--error");
    overlay.classList.remove("overlay--open");
  }
});

overlay.addEventListener("click", function (evt) {
  evt.preventDefault();
  feedbackPopup.classList.remove("modal-feedback--open");
  feedbackPopup.classList.remove("modal-feedback--error");
  overlay.classList.remove("overlay--open");
});

sliderControls.forEach(function(element) {
  element.addEventListener("click", function (evt) {
    var controlNum = evt.target.dataset.controls;
    sliderControls.forEach(function(control) {
      control.classList.remove("current");
    });
    element.classList.add("current");
    sliderItems.forEach(function(slide) {
      var slideNum = slide.dataset.slider;
      slide.classList.remove("main-slider__item--current");
      if (slideNum == controlNum) {
        slide.classList.add("main-slider__item--current");
      }
    });
    sliderColors.forEach(function(color) {
      pageBackground.classList.remove("page--" + color);
    });
    pageBackground.classList.add("page--" + sliderColors[controlNum-1]);
  });
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (feedbackPopup.classList.contains("modal-feedback--open")) {
      evt.preventDefault();
      feedbackPopup.classList.remove("modal-feedback--open");
      feedbackPopup.classList.remove("modal-feedback--error");
      overlay.classList.remove("overlay--open");
    }
  }
});
