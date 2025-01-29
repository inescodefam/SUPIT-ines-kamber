document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector("nav");
  let lastScroll = 0;
  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY;
    if (scrollTop > 25) {
      scrollTop > lastScroll
        ? navbar.classList.add("nav-hide")
        : navbar.classList.remove("nav-hide");

      lastScroll = scrollTop;
    }
  });
});
