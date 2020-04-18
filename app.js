//!selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

//!event listeners
todoButton.addEventListener('click', addTodo);

//!FN

function addTodo(event) {
  //prevent form submitting
  event.preventDefault();

  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  //create li
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //check mark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="far fa-check-square"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  //check trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  trashButton.classList.add('complete-btn');
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
  todoInput.value = '';
}
