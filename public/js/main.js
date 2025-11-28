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
