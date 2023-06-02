const carousel = document.querySelector(".carousel");
const item = document.querySelectorAll(".item");
const btnNext = document.querySelector(".btnNext");
const btnBack = document.querySelector(".btnBack");
const firstCardWidth = carousel.querySelector(".item").offsetWidth;
const carouselChildens = [...carousel.children];
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
carouselChildens
  .slice(-cardPerView, 0)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });
carouselChildens.slice(0, 1).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
btnBack.onclick = () => {
  console.log("back");
  carousel.scrollLeft -= firstCardWidth;
};
btnNext.onclick = () => {
  console.log("next");
  carousel.scrollLeft += firstCardWidth;
};
let isDragging = false,
  startX,
  startScrollLeft;
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
  item.onclick = (e) => {
    return false;
  };
};
const infiniteScroll = () => {
  if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.scrollLeft = -carousel.offsetWidth;
  }
};
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);