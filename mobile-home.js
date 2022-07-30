
const dateEl = document.getElementById('dateToday')
const addTodoDiv = document.getElementById('add-todo')
const addBtn = document.getElementById('edit-todo')

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
          <button class="addTaskBtn">Add task</button>
          <button class="cancelTaskBtn">Cancel</button>
      </div>
    </form>`
    addTodoDiv.innerHTML = formDiv
}
addBtn.addEventListener('click', createInputForm)