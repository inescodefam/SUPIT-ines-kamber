document.addEventListener("DOMContentLoaded", () => {
  const navbars = document.querySelectorAll("nav");
  const main = document.querySelector("main");
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    navbars.forEach((navbar) => {
      if (scrollTop > lastScrollTop) {
        navbar.classList.add("nav-hide");
        main.style.marginTop = "0px";
      } else {
        navbar.classList.remove("nav-hide");
        main.style.marginTop = "50px";
      }
    });
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
});
