let lastScrollTop = 0;
window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    document.body.classList.add("scrolling-down");
  } else {
    document.body.classList.remove("scrolling-down");
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
