const dropdowns = document.querySelectorAll(".dropdown");
const items = document.querySelectorAll(".dropdown > .items");
const image = document.querySelector(".image-carousel img");
const container = document.querySelector(".container");
let selectedMap = "Cache";
let imagesCount = 6;
let currentImageIdx = 1;
const dotsContainer = document.querySelector(".dots");

// Basic Toggle Function (Class "hidden")
function toggle(dropdownID) {
  items[dropdownID].classList.toggle("hidden");
}

// Traverse Dropdowns and add toggle functionality
for (let i = 0; i < dropdowns.length; i++) {
  dropdowns[i].addEventListener("click", () => {
    toggle(i);
  });
}

// Dropdown Menu Handling
const dropdownItems = document.querySelectorAll("button.item");
let dropdownSelected = document.querySelectorAll("button.selected");
for (let i = 0; i < dropdownItems.length; i++) {
  dropdownItems[i].addEventListener("click", () => {
    let item_ddId = dropdownItems[i].getAttribute("dd-id");
    let item_type = dropdownItems[i].getAttribute("type");

    // change the selected
    for (let j = 0; j < dropdownSelected.length; j++) {
      let selected_ddId = dropdownSelected[j].getAttribute("dd-id");
      if (selected_ddId === item_ddId) {
        dropdownSelected[j].textContent = dropdownItems[i].textContent;
        if (item_type === "color") {
          container.className = `container ${dropdownItems[i].value}`;
        } else if (item_type === "map") {
          image.src = dropdownItems[i].value;
          image.alt = "An Image of " + dropdownItems[i].textContent;
          selectedMap = dropdownItems[i].getAttribute("map");
          imagesCount = +dropdownItems[i].getAttribute("images");
          currentImageIdx = 1;
          handleDots();
          // console.log(selectedMap, imagesCount)
        }
      }
    }
  });
}

// Handle Carousel

// Prev Button
const prevBtn = document.querySelector("button.back-btn");

prevBtn.addEventListener("click", () => {
  if (currentImageIdx === 1) {
    currentImageIdx = imagesCount + 1;
    currentImageIdx -= 1;
    image.src = `./images/${selectedMap}-${currentImageIdx}.webp`;
    image.alt = `An Image of ${selectedMap}`;
    selectedDot(currentImageIdx);
  } else {
    currentImageIdx -= 1;
    image.src = `./images/${selectedMap}-${currentImageIdx}.webp`;
    image.alt = `An Image of ${selectedMap}`;
    selectedDot(currentImageIdx);
  }
});

// Next Button
nextBtn = document.querySelector("button.next-btn");
nextBtn.addEventListener("click", () => {
  if (currentImageIdx === imagesCount) {
    currentImageIdx = 0;
    currentImageIdx += 1;
    image.src = `./images/${selectedMap}-${currentImageIdx}.webp`;
    image.alt = `An Image of ${selectedMap}`;
    selectedDot(currentImageIdx);
  } else {
    currentImageIdx += 1;
    image.src = `./images/${selectedMap}-${currentImageIdx}.webp`;
    image.alt = `An Image of ${selectedMap}`;
    selectedDot(currentImageIdx);
  }
});

// Show/hide carousel buttons on hover
const carouselBox = document.querySelector(".image-carousel");
const carouselButtons = document.querySelector(".carousel-buttons");
carouselBox.addEventListener("mouseenter", () => {
  document.querySelector(".carousel-buttons").className = "carousel-buttons";
});

carouselBox.addEventListener("mouseleave", () => {
  carouselButtons.className = "carousel-buttons no-opacity";
});

// Handle Dots
function handleDots() {
  dotsContainer.innerHTML = "";
  for (let i = 0; i < imagesCount; i++) {
    let dot = document.createElement("div");
    i === 0 ? (dot.className = "dot current") : (dot.className = "dot");
    dotsContainer.appendChild(dot);
  }
}

function selectedDot(idx) {
  const dots = document.querySelectorAll(".dots > .dot");
  dots.forEach((dot) => {
    dot.className = "dot";
  });
  dots[idx - 1].className = "dot current";
}
