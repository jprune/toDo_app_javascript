let myToDos = JSON.parse(localStorage.getItem("myToDos")) || [];

const dateEl = document.getElementById('dateToday')
const addTodoDiv = document.getElementById('add-todo')
const createTodoBtn = document.getElementById('edit-todo')

//set today's date
const renderDate = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];
    const today = new Date();
    dateEl.textContent = monthNames[today.getMonth()] + ' ' + today.getDate()
}
renderDate()
render(myToDos)

// Create inputForm when add button in the top right is clicked
const createInputForm = () => {
  const formDiv = `
    <form>
      <input type="text" id="input-heading" name="fname" placeholder="e.g. Walk your Dog">
      <input type="textarea" id="input-description" name="fname" placeholder="Description">
      <div class="buttons">
          <button class="addTaskBtn" type="submit">Add task</button>
          <button class="cancelTaskBtn">Cancel</button>
      </div>
    </form>`
    addTodoDiv.innerHTML = formDiv
    const addTaskBtn = document.querySelector('.addTaskBtn')
    addTaskBtnListener(addTaskBtn)
    const cancelTaskBtn = document.querySelector('.cancelTaskBtn')
    cancelBtnListener(cancelTaskBtn)
}
createTodoBtn.addEventListener('click', createInputForm)

//render Tasks under input fields
function render(array) {
  const renderTaskContainer = document.querySelector('.renderTasks');
  renderTaskContainer.innerHTML = "";

  array.forEach(element => {
      const todo = document.createElement("div");
      todo.classList.add("todo-render");
        const todoBtns = document.createElement("div")
        todoBtns.classList.add("btn-todo")

        const todoCheck = document.createElement("button");
        todoCheck.classList.add("check-todo")
        todoCheck.innerHTML = `<img src="./assets/done.svg" alt="check-button">`;
        //!! Instead of input field work with label to customize checkbox experience?!!

        const todoTitle = document.createElement("h3");
        todoTitle.innerText = element.title;

        const desc = document.createElement("p");
        desc.innerText = element.description;

        const delBtn = document.createElement("button");
        delBtn.classList.add("delete-todo");
        delBtn.setAttribute(`id`, `${element.id}`)
        delBtn.innerHTML = `<img src="./assets/delete.svg" alt="delete-button">`;
        /*  delBtn.addEventListener("click", function () {
        console.log(`Deleting ${myToDosHeadings[i]}`);
        }); */

        const editBtn = document.createElement("button");
        editBtn.classList.add("editBtn-todo");
        editBtn.setAttribute(`id`, `${element.id}`)
        editBtn.innerHTML = `<img src="./assets/edit.svg" alt="edit-button">`;
        
      todoBtns.appendChild(todoCheck);
      todoBtns.appendChild(editBtn)
      todoBtns.appendChild(delBtn);
      todo.appendChild(todoBtns);
      todo.appendChild(todoTitle);
      todo.appendChild(desc);
      
      renderTaskContainer.appendChild(todo); 
      toDoBtnFunctions();
  }); 
}

function setLocalStorage(array) {
  localStorage.setItem("myToDos", JSON.stringify(array))
}

// get values of input if full and call render function
function addTaskBtnListener(addTaskBtn) {
  addTaskBtn.addEventListener("click", processInput)
}

const processInput = e => {
  e.preventDefault();
  const inputHeadingEl = document.getElementById('input-heading')
  const inputDescriptionEl = document.getElementById('input-description')
  if (inputHeadingEl.value === '') {
      return window.alert("please input value")
  } else {
      let id = myToDos.length + 1;
      myToDos.unshift({
          title: inputHeadingEl.value, 
          description: inputDescriptionEl.value, 
          id: id
      });
      inputHeadingEl.value = '';
      inputDescriptionEl.value = '';
      setLocalStorage(myToDos)
      render(myToDos)
      addTodoDiv.innerHTML = "";
  }
}

//Close editor when cancelBtn is pressed
function cancelBtnListener(cancelTaskBtn) {
  cancelTaskBtn.addEventListener("click", function(e){
    e.preventDefault();
    addTodoDiv.innerHTML = "";
  })
}

function toDoBtnFunctions() {
  const renderTaskContainer = document.querySelector('.renderTasks');
  renderTaskContainer.addEventListener("click", function (e) {
    //if a button with the class "delete-todo" is clicked
    console.log(e)

    if (e.target.parentNode.classList.contains("delete-todo")) {
        //only return items of the array which are NOT equal to the id 
        myToDos = myToDos.filter(el => el.id !== parseInt(e.target.parentNode.id))
        setLocalStorage(myToDos)
        render(myToDos)
    }
  
    //cross h3, p when checkbox is clicked
    if (e.target.parentNode.classList.contains("check-todo")) {
      if (e.target.parentNode.parentNode.parentNode.style.textDecoration === "") {
        e.target.parentNode.parentNode.parentNode.style.textDecoration = "line-through"  
      } else {
        e.target.parentNode.parentNode.parentNode.style.textDecoration = ""  
      }
    }

    if (e.target.parentNode.classList.contains("editBtn-todo")) {
      //jump to the top of page
      window.scrollTo(0, 0)
      //find corresponding todo obj in array with id
      const toDoToEdit = myToDos.filter(el => el.id === parseInt(e.target.parentNode.id))
      console.log(toDoToEdit)
      //open editor
      createInputForm()
      const addTaskBtn = document.querySelector('.addTaskBtn')
      addTaskBtn.textContent = "Save"
      //put content inside 
      const inputHeadingEl = document.getElementById('input-heading')
      inputHeadingEl.value = toDoToEdit[0].title
      const inputDescriptionEl = document.getElementById('input-description')
      inputDescriptionEl.value = toDoToEdit[0].description

      //hide current toDo that is edited 
      e.target.parentNode.parentNode.parentNode.style.display = "none"
      //addTask --> render myToDos again but with new content in the index OR Cancel closes editor and show todo

      //cancel:
      document.querySelector('.cancelTaskBtn').addEventListener('click', () => {
        e.target.parentNode.parentNode.parentNode.style.display = "flex"
      })

      //remove old event listener
      
      addTaskBtn.removeEventListener('click', processInput)
      addTaskBtn.addEventListener('click', e => {
        e.preventDefault()
        toDoToEdit[0].title = inputHeadingEl.value
        toDoToEdit[0].description = inputDescriptionEl.value
        setLocalStorage(myToDos)
        render(myToDos)
        addTodoDiv.innerHTML = "";
      })
    }
  });
}
