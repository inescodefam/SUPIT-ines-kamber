document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelectorAll("nav")[0];
  let lastScroll = 0;
  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY;
    if (scrollTop > lastScroll) {
      navbar.classList.add("nav-hide");
    } else {
      navbar.classList.remove("nav-hide");
    }
    lastScroll = scrollTop == 0 ? 0 : scrollTop;
  });
});
