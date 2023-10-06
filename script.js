const eduImgUCD = document.querySelector(".img--ucd-logo");
const eduImgCGCookie = document.querySelector(".img--cg-cookie-logo");
const eduImgUdemy = document.querySelector(".img--udemy-logo");
const eduImgTOP = document.querySelector(".img--top-logo");
const liUCD = document.querySelectorAll(".list--item-eduUCD");
const liCGCookie = document.querySelector(".list--item-eduCGCookie");
const liUdemy = document.querySelector(".list--item-eduUdemy");
const liTOP = document.querySelectorAll(".list--item-eduTOP");
const cat = document.querySelector(".skills-tb-img");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////
// Edu Image hover actions
eduImgUCD.addEventListener("mouseover", function (e) {
  liUCD.forEach(function (listItem) {
    listItem.classList.add("edu--list-item-hover");
  });
});

eduImgUCD.addEventListener("mouseout", function (e) {
  liUCD.forEach(function (listItem) {
    listItem.classList.remove("edu--list-item-hover");
  });
});

eduImgCGCookie.addEventListener("mouseover", function (e) {
  liCGCookie.classList.add("edu--list-item-hover");
});

eduImgCGCookie.addEventListener("mouseout", function (e) {
  liCGCookie.classList.remove("edu--list-item-hover");
});

eduImgUdemy.addEventListener("mouseover", function () {
  liUdemy.classList.add("edu--list-item-hover");
});

eduImgUdemy.addEventListener("mouseout", function () {
  liUdemy.classList.remove("edu--list-item-hover");
});

eduImgTOP.addEventListener("mouseover", function () {
  liTOP.forEach(function (listItem) {
    listItem.classList.add("edu--list-item-hover");
  });
});

eduImgTOP.addEventListener("mouseout", function () {
  liTOP.forEach(function (listItem) {
    listItem.classList.remove("edu--list-item-hover");
  });
});

///////////////////////////////////////
// Move cat
/* Move function from 
https://medium.com/@theredwillows/moving-an-element-with-javascript-part-1-765c6a083d45 */

function move(element, direction, distance = 20, duration = 1000) {
  var topOrLeft = direction == "left" || direction == "right" ? "left" : "top";
  var isNegated = direction == "up" || direction == "left";
  if (isNegated) {
    distance *= -1;
  }
  var elStyle = window.getComputedStyle(element);
  var value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
  var destination = Number(value) + distance;
  var frameDistance = distance / (duration / 10);
  function moveAFrame() {
    elStyle = window.getComputedStyle(element);
    value = elStyle.getPropertyValue(topOrLeft).replace("px", "");
    var newLocation = Number(value) + frameDistance;
    var beyondDestination =
      (!isNegated && newLocation >= destination) ||
      (isNegated && newLocation <= destination);
    if (beyondDestination) {
      element.style[topOrLeft] = destination + "px";
      clearInterval(movingFrames);
    } else {
      element.style[topOrLeft] = newLocation + "px";
    }
  }
  var movingFrames = setInterval(moveAFrame, 10);
}
cat.addEventListener("mouseover", function () {
  move(cat, "right", 1600, 1000);
});

///////////////////////////////////////
// Image Slideshow
// Slider

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

const footerText = document.querySelector(".para--footer-text");
const date = new Date();
footerText.innerHTML = `Created by Origineering ${date}`;
