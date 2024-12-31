const addInput = document.querySelector("#addInput");
const addBtn = document.querySelector("#addBtn");
const container = document.querySelector(".listContainer");
const deleteBtn = document.querySelectorAll('.remove')
const checkBtn = document.querySelectorAll('.fa-check')
const editForm = document.querySelector('section')
const saveEditBtn = document.querySelector('.saveEdit')
const main = document.querySelector('main')
const toDoForm = document.querySelector('form')
const editInput = document.querySelector('#editInput')
const saveTasks = document.querySelector('.saveTasks')

let oldInputValue;

function addTask() {
  const task = addInput.value.trim();
  if (task) {
    createElement(task);
    addInput.value = "";
  } else {
    alert("Por favor, adicione uma tarefa!");
  }
}

const toggleForm = () => {
  editForm.classList.toggle('hide')
  main.classList.toggle('hide')
}

const updateTodo = (text) => {
  const todos = document.querySelectorAll('.itemDiv')

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector('p')
    console.log(todoTitle, text)

    if(todoTitle.innerText === oldInputValue){
      todoTitle.innerText = text;
    }
  })
}

toDoForm.addEventListener('submit', (e) => {
  e.preventDefault()
})

editForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const editInputValue = editInput.value

  if(editInputValue){
    updateTodo(editInputValue)
  }
  toggleForm()
})





document.addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest('.itemDiv')
    const checkButton = targetEl.closest('button')
    let toDoTitle;

    if(parentEl && parentEl.querySelector('p')){
      toDoTitle = parentEl.querySelector('p').innerText
    }

    if(targetEl.classList.contains('remove')){
        parentEl.remove()
        saveState()
    }
    if(targetEl.classList.contains('fa-trash')){
        parentEl.remove()
        saveState()
    }
    if(targetEl.classList.contains('fa-check')){
      checkButton.classList.toggle('checked')
      saveState()
    }
    if(targetEl.classList.contains('fa-edit')){
      saveState()
      toggleForm()
      editInput.value = toDoTitle
      oldInputValue = toDoTitle
    }


    if(targetEl.classList.contains('cancelEdit')){
      toggleForm()
    }
});

saveEditBtn.addEventListener('submit', (e) => {
  e.preventDefault()

  toggleForm()
})



addBtn.addEventListener("click", addTask);

function createElement(task) {
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("itemDiv");
  const item = document.createElement("div");
  item.classList.add("item");
  const tasks = document.createElement("p");
  tasks.textContent = task;
  const buttons = document.createElement("div");
  buttons.classList.add("buttons");

  const editBtn = document.createElement("button");
  editBtn.classList.add("botao");
  editBtn.classList.add('edit')
  const editBtnI = document.createElement("i");
  editBtnI.classList.add("fa-solid");
  editBtnI.classList.add("fa-edit");

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("botao");
  removeBtn.classList.add("remove");
  const removeBtnI = document.createElement("i");
  removeBtnI.classList.add("fa-solid");
  removeBtnI.classList.add("fa-trash");

  const checkBtn = document.createElement("button");
  checkBtn.classList.add("botao");
  const checkBtnI = document.createElement("i");
  checkBtnI.classList.add("fa-solid");
  checkBtnI.classList.add("fa-check");

  container.appendChild(itemDiv);
  itemDiv.appendChild(item);
  itemDiv.appendChild(buttons);
  item.appendChild(tasks);
  buttons.appendChild(editBtn);
  buttons.appendChild(removeBtn);
  buttons.appendChild(checkBtn);
  editBtn.appendChild(editBtnI);
  removeBtn.appendChild(removeBtnI);
  checkBtn.appendChild(checkBtnI);
}

function saveState(){
    const divContent = container.innerHTML;
    localStorage.setItem("divContent", divContent);
}


addBtn.addEventListener("click", saveState);
saveTasks.addEventListener('click', saveState)

function carregar() {
  const savedContent = localStorage.getItem("divContent");
  if (savedContent) {
    container.innerHTML = savedContent;
  }
}

function atualizar() {
  const savedContent = localStorage.getItem("divContent");
  if (savedContent) {
    container.innerHTML = savedContent;
  }
}


document.addEventListener("DOMContentLoaded", carregar);

