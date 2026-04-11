const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

// 1. Create a data object
const images = [
  { filename: "pic1.jpg", alt: "Closeup of a human eye" },
  { filename: "pic2.jpg", alt: "Rock that looks like a wave" },
  { filename: "pic3.jpg", alt: "Purple and white pansies" },
  { filename: "pic4.jpg", alt: "Section of wall from a pharaoh's tomb" },
  { filename: "pic5.jpg", alt: "Large moth on a leaf" }
];

// 2. Add the images to the thumbnail bar

const baseURL = "";

// Create a for...of loop
for (const image of images) {
  // Create a new <img> element
  const newImage = document.createElement("img");
  
  // Set the src to a combination of baseURL and filename, and set alt text
  newImage.src = baseURL + image.filename;
  newImage.alt = image.alt;
  
  // Add attribute to make it focusable via keyboard
  newImage.setAttribute("tabindex", "0");
  
  // Append the <img> to the thumbBar
  thumbBar.appendChild(newImage);
  
  // Add a click event handler
  newImage.addEventListener("click", updateDisplayedImage);
}

// 3. Create the updateDisplayedImage() function
function updateDisplayedImage(e) {
  displayedImage.src = e.target.src;
  displayedImage.alt = e.target.alt;
}

// 4. Wire up the Darken/Lighten button
btn.addEventListener("click", function() {
  if (btn.classList.contains("dark")) {
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgb(0 0 0 / 0.5)";
  } else {
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgb(0 0 0 / 0)";
  }
  
  btn.classList.toggle("dark");
});