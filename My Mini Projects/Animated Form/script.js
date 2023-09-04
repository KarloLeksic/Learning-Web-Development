// Get all input fields
let inputs = document.querySelectorAll('input');

// Set focus and blur listener on each input
for (let input of inputs) {
  input.addEventListener('focus', e => {
    // Get the label
    let container = e.target.closest('.input-container');
    let label = container.querySelector('label');

    // Move the label up
    label.classList.add('move');
  });

  input.addEventListener('blur', e => {
    // Get the label
    let container = e.target.closest('.input-container');
    let label = container.querySelector('label');

    // Get the value from the input field
    let value = e.target.value;

    // If it's empty string, return label to the center of input field
    if (value === '') {
      label.classList.remove('move');
    }
  });
}

// Turn off autocomplete
// For some reason, it doesn't work on the classic way
