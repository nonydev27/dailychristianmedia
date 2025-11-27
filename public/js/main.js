// 1. Get all the elements we want to watch and reveal
const elementsToReveal = document.querySelectorAll(".hidden");

// 2. Define the observer options
const options = {
  root: null, // use the viewport as the container
  rootMargin: "0px",
  threshold: 0.5, // trigger when 50% of the element is visible
};

// 3. Define the observer function
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // If the element is now visible (intersecting)
    if (entry.isIntersecting) {
      // Add the 'reveal' class to trigger the CSS transition
      entry.target.classList.add("reveal");

      // Stop observing the element since it's now visible
      observer.unobserve(entry.target);
    }
  });
}, options);

// 4. Loop through each element and start observing it
elementsToReveal.forEach((element) => {
  observer.observe(element);
});

// Get references to the new backdrop element
const devotionButton = document.getElementById("devotionButton");
const scripturePopout = document.getElementById("scripturePopout");
const closeButton = document.getElementById("closeButton");
const backdrop = document.getElementById("backdrop"); // NEW

// Function to open the pop-up
function openPopout() {
  // 1. Show the backdrop immediately (by setting display to block)
  backdrop.style.display = "block";

  // 2. Add the 'active' class to the backdrop to trigger its fade-in animation
  setTimeout(() => {
    backdrop.classList.add("active");
  }, 10); // Small delay ensures CSS transition works

  // 3. Show the pop-up immediately
  scripturePopout.style.display = "block";

  // 4. Add the 'active' class to the pop-up to trigger its slow pop-out animation
  setTimeout(() => {
    scripturePopout.classList.add("active");
  }, 10);
}

// Function to close the pop-up
function closePopout() {
  // 1. Remove the 'active' class from both elements to start the fade/scale-down
  scripturePopout.classList.remove("active");
  backdrop.classList.remove("active");

  // 2. Wait for the transition (0.7s for pop-up, 0.5s for backdrop) to finish before hiding
  // We use the longest duration (0.7s) to ensure the animation completes
  setTimeout(() => {
    scripturePopout.style.display = "none";
    backdrop.style.display = "none";
  }, 700); // 700 milliseconds
}

// Attach event listeners (including a way to close by clicking the backdrop)
devotionButton.addEventListener("click", openPopout);
closeButton.addEventListener("click", closePopout);
backdrop.addEventListener("click", closePopout); // NEW: Closes when backdrop is clicked
