//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todosContainer = document.querySelector('.todo-container');

//event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

function addTodo(event) {
  let message = document.createElement('div');

  //check inp value
  if (todoInput.value == '') {
    event.preventDefault();

    //add message if input value is empty
    message.innerHTML = `
          <i class="fas fa-exclamation-triangle"></i>
          <p>Empty input value</p>
          <p>Please type something</p>
        `;
    message.classList = 'warning-message';
    todosContainer.before(message);

    //remove message
    setTimeout(() => {
      message.classList.add('fall');
      message.addEventListener('transitionend', () => message.remove());
    }, 1500);
  } else {
    //prevent form submitting
    event.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
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

    //add to list
    todoList.appendChild(todoDiv);

    // clear input value
    todoInput.value = '';
  }
}

// delete and check fn
function deleteCheck(event) {
  const item = event.target;

  //delete todo
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;

    //animation
    todo.classList.add('fall');
    todo.addEventListener('transitionend', () => todo.remove());
  }

  //check mark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    const icon = item.firstChild;
    todo.classList.toggle('completed');
    icon.classList.toggle('fa-square');
    icon.classList.toggle('fa-check-square');
  }
}
