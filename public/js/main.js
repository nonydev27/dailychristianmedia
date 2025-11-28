const elementsToReveal = document.querySelectorAll(".hidden");

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");

      observer.unobserve(entry.target);
    }
  });
}, options);

elementsToReveal.forEach((element) => {
  observer.observe(element);
});

const devotionButton = document.getElementById("devotionButton");
const scripturePopout = document.getElementById("scripturePopout");
const closeButton = document.getElementById("closeButton");
const backdrop = document.getElementById("backdrop");

function openPopout() {
  backdrop.style.display = "block";

  setTimeout(() => {
    backdrop.classList.add("active");
  }, 10); //

  scripturePopout.style.display = "block";

  setTimeout(() => {
    scripturePopout.classList.add("active");
  }, 10);
}

function closePopout() {
  scripturePopout.classList.remove("visible");
  backdrop.classList.remove("active");

  setTimeout(() => {
    scripturePopout.style.display = "none";
    backdrop.style.display = "none";
  }, 700);
}

devotionButton.addEventListener("click", openPopout);
closeButton.addEventListener("click", closePopout);
backdrop.addEventListener("click", closePopout);

document.addEventListener("DOMContentLoaded", () => {
  const primaryNavbar = document.querySelector(".navbar-primary");
  const secondaryNavbar = document.getElementById("secondary-navbar");
  const teamSection = document.getElementById("Team");

  if (!primaryNavbar || !secondaryNavbar || !teamSection) {
    console.error("One or more required elements were not found.");
    return;
  }

  const activeClass = "navbar-color-change";

  const totalNavbarHeight =
    primaryNavbar.offsetHeight + secondaryNavbar.offsetHeight;

  const options = {
    rootMargin: `-${totalNavbarHeight}px 0px 0px 0px`,
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.boundingClientRect.top < 0) {
        secondaryNavbar.classList.add(activeClass);
      } else {
        secondaryNavbar.classList.remove(activeClass);
      }
    });
  }, options);

  observer.observe(teamSection);
});
