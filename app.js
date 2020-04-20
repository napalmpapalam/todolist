//!selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todosContainer = document.querySelector('.todo-container');
//!event listeners
todoButton.addEventListener('click', addTodo);

//!FN

function addTodo(event) {
  let message = document.createElement('div');
  if (todoInput.value == '') {
    event.preventDefault();
    message.innerHTML = `
          <i class="fas fa-exclamation-triangle"></i>
          <p>Empty input value</p>
          <p>Please type something</p>
        `;
    message.classList = 'warning-message';
    todosContainer.before(message);

    setTimeout(() => {
      message.remove();
      message.innerHTML = '';
    }, 1500);
  } else {
    //prevent form submitting
    event.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    console.log(todoInput.value.length);
    const newTodo = document.createElement('li');
    if (todoInput.value.toString().length > 23) {
      newTodo.innerHTML = todoInput.value.slice(0, 20) + '...';
    } else {
      newTodo.innerText = todoInput.value;
    }
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="far fa-square"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.prepend(completedButton);

    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = '';
  }
}
