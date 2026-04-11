const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

// Create a data object
const images = [
  { filename: "pic1.jpg", alt: "Closeup of a human eye" },
  { filename: "pic2.jpg", alt: "Rock that looks like a wave" },
  { filename: "pic3.jpg", alt: "Purple and white pansies" },
  { filename: "pic4.jpg", alt: "Section of wall from a pharaoh's tomb" },
  { filename: "pic5.jpg", alt: "Large moth on a leaf" },
];

// Loop through the images using a for...of loop
for (const image of images) {
  // Create a new image element
  const newImage = document.createElement("img");
  
  // Set the source directly to the local file name and add alt text
  newImage.src = image.filename;
  newImage.alt = image.alt;
  
  // Append the image as a child of the thumbBar
  thumbBar.appendChild(newImage);
  
  // Update the display to show the image full size when a thumb is clicked
  newImage.addEventListener("click", updateDisplayedImage);
}

// Create the updateDisplayedImage() function
function updateDisplayedImage(e) {
  displayedImage.src = e.target.src;
  displayedImage.alt = e.target.alt;
}

// Wire up the Darken/Lighten button
btn.addEventListener("click", () => {
  // If the button has a "dark" class set,
  // change text to "Lighten" and make the overlay darker
  if (btn.classList.contains("dark")) {
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgb(0 0 0 / 0.5)";
  } else {
    // Else, change text to "Darken" and make
    // the overlay lighter
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgb(0 0 0 / 0)";
  }
  // Toggle the class ready for the next button press
  btn.classList.toggle("dark");
});