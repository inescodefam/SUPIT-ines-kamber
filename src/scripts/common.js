document.addEventListener("DOMContentLoaded", () => {
  const navbars = document.querySelectorAll("nav");
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    navbars.forEach((navbar) => {
      if (scrollTop > lastScrollTop) {
        navbar.classList.add("nav-hide");
      } else {
        navbar.classList.remove("nav-hide");
      }
    });
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    console.log(lastScrollTop);
  });
});
