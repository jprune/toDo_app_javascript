let myToDos = [];

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
const render = (array) => {
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

// get values of input if full and call render function
function addTaskBtnListener(addTaskBtn) {
  addTaskBtn.addEventListener("click", e => {
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
        localStorage.setItem("myToDos", JSON.stringify(myToDos))
        render(myToDos)
        addTodoDiv.innerHTML = "";
    }
  })
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
      //find position in array with id
      //open editor with content inside
      //either way overwrite edit or cancel func
    }
  });
}
