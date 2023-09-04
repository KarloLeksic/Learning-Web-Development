// Empty array for todo list
const todoList = [{
  name: 'test',
  dueDate: '2022-12-22'
}, {
  name: 'drugi test',
  dueDate: '2022-12-12'
}];

renderTodoList();

// Add action to add button
document.querySelector('.js-add-btn').addEventListener("click", () => {
  // Get text from the textbox
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  // Get date from the input
  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  // Add to the end of array
  todoList.push({
    // name: name,
    // dueDate: dueDate
    name, dueDate
  });

  // Empty the input element
  inputElement.value = '';

  // Display each element on the page
  renderTodoList();
});

// Go through each todo string and display it on the screen
function renderTodoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const html = `
      <p>
        ${todoObject.name}
      </p> 
      <p>
        ${todoObject.dueDate}
      </p>
      <button onclick="
        // Brisemo samo jednog iz liste, a to je bas taj na indexu i i brisemo 1 vrijednost
        todoList.splice(${i}, 1);

        // Ponovno prikazati novu listu
        renderTodoList();
        " class="delete-btn">Delete
      </button>
    `;
    todoListHTML += html;
  }

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}