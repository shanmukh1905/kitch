// Get all grid items
const boxes = document.querySelectorAll('.grid-item');

// Function to handle box click events
function box_click(clickedBox) {
  // Example: Change the background color of the clicked box
  clickedBox.style.backgroundColor = 'blue';

  // Call pass function and pass the clicked box
  pass(clickedBox);
}

// Function to handle logic after box is clicked
function pass(clickedBox) {
  // Initialize an array to store the positions of clicked boxes
  const clickedPositions = [];

  // Loop through each grid item
  boxes.forEach(box => {
    // Check if the box is clicked (has the blue background color)
    if (box.style.backgroundColor === 'blue') {
      // Push the position of the clicked box (its index) to the clickedPositions array
      clickedPositions.push(Array.from(boxes).indexOf(box));
    }
  });

  // Check if the clicked positions match the specified positions
  if (clickedPositions.includes(0) && clickedPositions.includes(1) && clickedPositions.includes(4) && clickedPositions.includes(7) && clickedPositions.includes(8)) {
    // If condition is true, perform any action here
    console.log('Clicked on boxes: 1, 2, 5, 8, and 9');
    // Example: Redirect to another page
    window.location.href = 'animate-onscroll.html'; // Replace 'animate-onscroll.html' with the desired URL
  }
}

// Loop through each grid item and add a click event listener
boxes.forEach(box => {
  box.addEventListener('click', () => {
    box_click(box); // Call the box_click function passing the clicked box as a
  });
});