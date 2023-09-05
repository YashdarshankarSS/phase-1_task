var usedval = []
var arr = []
function validateTaskId() {
  // var taskId = parseInt(document.getElementById("taskId").value);
  var taskId = parseInt(document.querySelector("#taskId").value);

  if (isNaN(taskId) || taskId == null) {
    alert('Please enter a valid task ID');

  }
  else if (usedval.includes(taskId)) {
    alert("Task ID already exists");

  }
  else {
    if (validateTaskName()) {
      usedval.push(taskId);
    }
    console.log(usedval);
    return true;
  }
}
function validateTaskName() {
  const val = document.getElementById("taskName").value;
  if (val != "" && isNaN(val)) {
    return true;
  }
  else {
    alert('Please enter a valid task name');
  }
}
function validateDate() {
  // const TaskEndDateInput = document.getElementById('endDate');
  // const TaskStartDateInput = document.getElementById('startDate');
  const TaskEndDateInput = document.querySelector('#endDate');
  const TaskStartDateInput = document.querySelector('#startDate');


  const TaskEndDate = new Date(TaskEndDateInput.value);
  const TaskStartDate = new Date(TaskStartDateInput.value);
  const currentDate = new Date();
  // var inprocess = document.getElementById('inprocess');
  var inprocess = document.querySelector('#inprocess');

  if (currentDate > TaskEndDate) {
    inprocess.style.display = 'none';
  }
  else {
    inprocess.style.display = 'block';
  }


  if (TaskEndDateInput.value.length == 0 || TaskStartDateInput.value.length == 0) {
    alert("please fill date values");
  }

  else if (TaskEndDate <= TaskStartDate) {
    alert('End Date must be later than Start Date.');
  } else {
    return true;
  }
}
const addTaskBtn = document.getElementById("addTaskBtn");
const taskName = document.getElementById("taskName").value.trim();
const startDate = document.getElementById("startDate").value;
const endDate = document.getElementById("endDate").value;
const status = document.getElementById("status").value;
var taskId = document.getElementById("taskId").value;

const currentDate = new Date();
const endDateInput = document.getElementById('endDate');
const inprocessOption = document.getElementById('inprocess');
const duedateOption = document.getElementById('duedatepassed');


endDateInput.addEventListener('change', function () {
  const selectedDate = new Date(endDateInput.value);
  if (selectedDate > currentDate) {
    inprocessOption.style.display = 'block';
    duedateOption.style.display = 'none';

  } else {
    inprocessOption.style.display = 'none';
    duedateOption.style.display = 'block';
  }
});

addTaskBtn.addEventListener("click", function temp() {
  if (validateTaskId() && validateTaskName() && validateDate()) {
    addTask();
  }
});
function addTask() {
  const taskName = document.getElementById("taskName").value.trim();
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  const status = document.getElementById("status").value;
  const taskId = document.getElementById("taskId").value.trim();
  const taskItem = createTaskElement(taskName, startDate, endDate, status, taskId);

  document.getElementById("taskList").appendChild(taskItem);
}
function createTaskElement(taskName, startDate, endDate, status, taskId) {
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    
    <span class="complete"><b>Task ID:</b> ${taskId}</span>
  
    <span class="complete"><b>Task Name : </b><span class="taskName">${taskName}</span></span>
  
    <span class="complete"><b>Start Date:</b> <span class="startDate">${startDate.value}</span></span>
  
    <span class="complete"><b>End Date:</b> <span class="endDate">${endDate.value}</span></span>
  
    <span class="complete"><b>Status:</b> <span class="status">${status}</span></span>
    <button class="addSubTaskBtn">Add Sub-Task</button>
    <button class="editTaskBtn">Edit</button>
    <button class="deleteTaskBtn">Delete</button>
    <ul class="subTaskList"></ul>
  `;
  let new_arr = [taskId, taskName, startDate.value, endDate.value, status]
  arr.push(new_arr);
  console.log(arr);



  // endDate.addEventListener('change', function () {
  //   const selectedDate = new Date(endDate.value);
  //   if (selectedDate > currentDate) {
  //     // inprocessOption.style.display = 'block';
  //     // duedateOption.style.display = 'none';
  //     console.log("running if statement");

  //   } else {
  //     // inprocessOption.style.display = 'none';
  //     // duedateOption.style.display = 'block';
  //     console.log("running else statement");
  //   }
  // });
  const addSubTaskBtn = taskItem.querySelector(".addSubTaskBtn");
  addSubTaskBtn.addEventListener("click", function () {

    let startdate = new Date(startDate.value);
    let enddate = new Date(endDate.value);

    openSubTaskInput(taskItem.querySelector(".subTaskList"), 0, taskId, startdate, enddate);
  });

  const editTaskBtn = taskItem.querySelector(".editTaskBtn");
  editTaskBtn.addEventListener("click", function () {
    openEditModal(taskItem.querySelector(".taskName"), taskItem.querySelector(".startDate"), taskItem.querySelector(".endDate"), taskItem.querySelector(".status"));
  });

  const deleteTaskBtn = taskItem.querySelector(".deleteTaskBtn");
  deleteTaskBtn.addEventListener("click", function () {
    taskItem.remove();
  });

  return taskItem;

}
var subtaskCounter = 1;

function openSubTaskInput(subTaskList, currentLevel, parentTaskId, parentStartDate, parentEndDate) {
  if (currentLevel < 2) {


    const subTaskInput = document.createElement("input");
    subTaskInput.setAttribute("type", "text");
    subTaskInput.setAttribute("placeholder", `Enter sub-task level ${currentLevel + 2} name...`);

    const subStartDate = document.createElement("input");
    subStartDate.setAttribute("type", "date");

    const subEndDate = document.createElement("input");
    subEndDate.setAttribute("type", "date");

    const subStatus = document.createElement("select");
    const statusOptions = ["completed", "duedatepassed", "incomplete", "cancelled"];
    for (const option of statusOptions) {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      subStatus.appendChild(optionElement);
    }

    const addSubTaskBtn = document.createElement("button");
    addSubTaskBtn.textContent = "Add";
    addSubTaskBtn.addEventListener("click", function () {
      const subTaskName = subTaskInput.value.trim();
      const subTaskStartDate = subStartDate.value;
      const subTaskEndDate = subEndDate.value;
      const subTaskStatus = subStatus.value;

      const startdate = new Date(subTaskStartDate);
      const enddate = new Date(subTaskEndDate);



      if (subTaskName !== "" && subTaskStartDate !== "" && subTaskEndDate !== "" && subTaskStatus !== "" && startdate < enddate && parentStartDate < startdate && parentEndDate > enddate) {
        newId = `${parentTaskId}.${subtaskCounter}`;
        subtaskCounter++;
        const subTaskItem = createSubTaskElement(subTaskName, currentLevel + 1, newId, subStartDate.value, subEndDate.value, subStatus.value);
        subTaskList.appendChild(subTaskItem);
        subTaskInput.remove();
        subStartDate.remove();
        subEndDate.remove();
        subStatus.remove();
        addSubTaskBtn.remove();
        cancelSubTaskBtn.remove();
      }
      else if (startdate > enddate) {
        alert("End date should come later than start date");
      }
      else if (parentStartDate > startdate) {
        alert("startdate should be later than parent start date");
      }

      else if (parentEndDate < enddate) {
        alert("End Date should come before parent end date");
      }
      else {
        alert('Please fill all fields');
      }

    });

    const cancelSubTaskBtn = document.createElement("button");
    cancelSubTaskBtn.textContent = "cancel";
    cancelSubTaskBtn.classList.add("cancelBtn");
    cancelSubTaskBtn.addEventListener("click", function () {
      subTaskInput.remove();
      subStartDate.remove();
      subEndDate.remove();
      subStatus.remove();
      addSubTaskBtn.remove();
      cancelSubTaskBtn.remove();


    });

    subTaskList.appendChild(subTaskInput);
    subTaskList.appendChild(subStartDate);
    subTaskList.appendChild(subEndDate);
    subTaskList.appendChild(subStatus);
    subTaskList.appendChild(addSubTaskBtn);
    subTaskList.appendChild(cancelSubTaskBtn);

  }
}

function createSubTaskElement(subTaskName, currentLevel, subTaskId, subStartDate, subEndDate, subStatus) {
  const subTaskItem = document.createElement("li");
  subTaskItem.innerHTML = `
  
  <span class="complete"><b>Sub-Task ID:</b> ${subTaskId}</span>
  
    <span class="complete"><b>Sub-Task Name:</b> <span class="subTaskName">${subTaskName}</span></span>
  
    <span class="complete"><b>Start Date:</b> ${subStartDate}</span>
  
    <span class="complete"><b>End Date:</b> ${subEndDate}</span>
  
    <span class="complete"><b>Status:</b> ${subStatus}</span>
  
    
    <button class="addSubTaskBtn">Add Sub-Task</button>
    <button class="editSubTaskBtn">Edit</button>
    <button class="deleteSubTaskBtn">Delete</button>
    <ul class="subTaskList"></ul>
  `;
  let new_arr = [subTaskId, subTaskName, subStartDate, subEndDate, subStatus]
  arr.push(new_arr);
  console.log(arr);


  const addSubTaskBtn = subTaskItem.querySelector(".addSubTaskBtn");

  if (currentLevel >= 2) {
    addSubTaskBtn.style.display = "none";
  }

  addSubTaskBtn.addEventListener("click", function () {
    let startdate = new Date(subStartDate);
    let enddate = new Date(subEndDate);
    console.log(startdate, subStartDate);
    console.log(enddate, subEndDate);


    openSubTaskInput(subTaskItem.querySelector(".subTaskList"), currentLevel, subTaskId, startdate, enddate);
  });

  const editSubTaskBtn = subTaskItem.querySelector(".editSubTaskBtn");
  editSubTaskBtn.addEventListener("click", function () {
    openEditModal(subTaskItem.querySelector(".subTaskName"), subStartDate, subEndDate, subStatus);
  });

  const deleteSubTaskBtn = subTaskItem.querySelector(".deleteSubTaskBtn");
  deleteSubTaskBtn.addEventListener("click", function () {
    subTaskItem.remove();
  });

  return subTaskItem;
}

function openEditModal(element, elementSD, elementED, elementSS) {
  const modal = document.createElement("div");
  modal.classList.add("edit-modal");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.value = element.textContent.trim();

  const startDateInput = document.createElement("input");
  startDateInput.setAttribute("type", "date");


  const endDateInput = document.createElement("input");
  endDateInput.setAttribute("type", "date");


  const statusSelect = document.createElement("select");
  const statusOptions = ["completed", "duedatepassed", "incomplete", "cancelled"];
  for (const option of statusOptions) {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    statusSelect.appendChild(optionElement);
  }

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", function () {
    const newValue = input.value.trim();
    const newStartDate = startDateInput.value;
    const newEndDate = endDateInput.value;
    const newStatus = statusSelect.value;
    if (newValue !== "") {
      element.textContent = newValue;
      elementSD.textContent = newStartDate;
      elementED.textContent = newEndDate;
      elementSS.textContent = newStatus;

      modal.remove();
    }

  });

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.classList.add("cancelBtn");
  cancelButton.addEventListener("click", function () {
    modal.remove();
  });

  modal.appendChild(input);
  modal.appendChild(startDateInput);
  modal.appendChild(endDateInput);
  modal.appendChild(statusSelect);
  modal.appendChild(saveButton);
  modal.appendChild(cancelButton);

  document.body.appendChild(modal);
}




searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", function () {
  search_val = document.querySelector("#searchInput").value;
  console.log("Value to Search : - ", search_val);
  tbody = document.querySelector("tbody");
  tbody.innerHTML = ``;
  arr.forEach(i => {
    i.forEach(item => {
      if (item == search_val) {
        alert("search is successful");
        tbody.innerHTML += `
        <tr>
        <td>${i[0]}</td>
        <td>${i[1]}</td>
        <td>${i[2]}</td>
        <td>${i[3]}</td>
        <td>${i[4]}</td>
      </tr>
      
        
        `

      }
      

    })

  }

  );

});