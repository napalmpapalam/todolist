//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todosContainer = document.querySelector('.todo-container');
const filterOption = document.querySelector('.filter-todo');

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

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
    //to-do div
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
    // add todo localstorage
    saveLocalTodos(todoInput.value);
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
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', () => todo.remove());
  }

  //check mark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    const icon = item.firstChild;
    todo.classList.toggle('checked');
    icon.classList.toggle('fa-square');
    icon.classList.toggle('fa-check-square');
  }
}

// select todos function
function filterTodo(elem) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (elem.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'checked':
        console.log(todo.classList);
        if (todo.classList.contains('checked')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'going':
        if (!todo.classList.contains('checked')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

// checking localstorage todos
function checkLocalTodos() {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
}

// saving localstorage items
function saveLocalTodos(todo) {
  let todos = checkLocalTodos();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// getting localstorage items
function getTodos() {
  let todos = checkLocalTodos();

  todos.forEach((todo) => {
    //to-do div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
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
  });
}

//removing localstorage todos
function removeLocalTodos(todo) {
  let todos = checkLocalTodos();

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
