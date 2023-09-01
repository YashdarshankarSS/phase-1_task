var usedval = []

function validateTaskId(){
  var taskId = parseInt(document.getElementById("taskId").value);
  if(isNaN(taskId) || taskId == null){
    alert('Please enter a valid task ID');
    
  }
  else if(usedval.includes(taskId)){
    alert("Task ID already exists");

  }
  else{
    if(validateTaskName()){
      usedval.push(taskId);
    }
    console.log(usedval);    
    return true;
  }
}
function validateTaskName(){
  const val = document.getElementById("taskName").value;
  if(val != "" && isNaN(val)){
    return true;

  }
  else{
    alert('Please enter a valid task name');
  }
}
function validateDate(){
  const TaskEndDateInput = document.getElementById('endDate');
  const TaskStartDateInput = document.getElementById('startDate');
  const TaskEndDate = new Date(TaskEndDateInput.value);
  const TaskStartDate = new Date(TaskStartDateInput.value);
  console.log("start end",TaskStartDate);
  console.log("end date",TaskEndDate);
  const currentDate = new Date();
  var inprocess = document.getElementById('inprocess');
  if(currentDate > TaskEndDate){
    inprocess.style.display='none';
  }
  else{
    inprocess.style.display='block';
  }


  if(TaskEndDateInput.value.length == 0 || TaskStartDateInput.value.length == 0) 
  {
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
  
  addTaskBtn.addEventListener("click", function temp(){
  if(validateTaskId() && validateTaskName() && validateDate())
  {
    addTask(); 
  }
  });
function addTask() {
  const taskName = document.getElementById("taskName").value.trim();
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const status = document.getElementById("status").value;
  const taskId = document.getElementById("taskId").value.trim(); 
  const taskItem = createTaskElement(taskName, startDate, endDate, status, taskId); 
  document.getElementById("taskList").appendChild(taskItem);
}
function createTaskElement(taskName, startDate, endDate, status, taskId) {
  const taskItem = document.createElement("li");
  taskItem.innerHTML = `
    
    <span><b>Task ID:</b> ${taskId}</span>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span ><b>Task Name : </b><span class="taskName">${taskName}</span></span>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span><b>Start Date:</b> ${startDate}</span>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span><b>End Date:</b> ${endDate}</span>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span><b>Status:</b> ${status}</span>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="addSubTaskBtn">Add Sub-Task</button>
    <button class="editTaskBtn">Edit</button>
    <button class="deleteTaskBtn">Delete</button>
    <ul class="subTaskList"></ul>
  `;
  const addSubTaskBtn = taskItem.querySelector(".addSubTaskBtn");
  addSubTaskBtn.addEventListener("click", function () {
    openSubTaskInput(taskItem.querySelector(".subTaskList"), 0, taskId);
  });

  const editTaskBtn = taskItem.querySelector(".editTaskBtn");
  editTaskBtn.addEventListener("click", function () {
    openEditModal(taskItem.querySelector(".taskName"), "task");
  });

  const deleteTaskBtn = taskItem.querySelector(".deleteTaskBtn");
  deleteTaskBtn.addEventListener("click", function () {
    taskItem.remove();
  });

  return taskItem;

}
var subtaskCounter = 1;

function openSubTaskInput(subTaskList, currentLevel, parentTaskId) {
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
      
      if (subTaskName !== "" && subTaskStartDate !== "" && subTaskEndDate !== "" && subTaskStatus !== "" ) {
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
      else{
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
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <span><b>Sub-Task ID:</b> ${subTaskId}</span>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span><b>Sub-Task Name:</b> <span class="subTaskName">${subTaskName}</span></span>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span><b>Start Date:</b> ${subStartDate}</span>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span><b>End Date:</b> ${subEndDate}</span>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span><b>Status:</b> ${subStatus}</span>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
    <button class="addSubTaskBtn">Add Sub-Task</button>
    <button class="editSubTaskBtn">Edit</button>
    <button class="deleteSubTaskBtn">Delete</button>
    <ul class="subTaskList"></ul>
  `;

  const addSubTaskBtn = subTaskItem.querySelector(".addSubTaskBtn");

  if (currentLevel >= 2) {
    addSubTaskBtn.style.display = "none"; 
  }

  addSubTaskBtn.addEventListener("click", function () {
    openSubTaskInput(subTaskItem.querySelector(".subTaskList"), currentLevel, subTaskId);
  });

  const editSubTaskBtn = subTaskItem.querySelector(".editSubTaskBtn");
  editSubTaskBtn.addEventListener("click", function () {
    openEditModal(subTaskItem.querySelector(".subTaskName"),  subStartDate, subEndDate, subStatus);
  });

  const deleteSubTaskBtn = subTaskItem.querySelector(".deleteSubTaskBtn");
  deleteSubTaskBtn.addEventListener("click", function () {
    subTaskItem.remove();
  });

  return subTaskItem;
}

function openEditModal(element, startDate = '', endDate = '', status = '') {
  const modal = document.createElement("div");
  modal.classList.add("edit-modal");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.value = element.textContent.trim();

  const startDateInput = document.createElement("input");
  startDateInput.setAttribute("type", "date");
  startDateInput.value = startDate;

  const endDateInput = document.createElement("input");
  endDateInput.setAttribute("type", "date");
  endDateInput.value = endDate;

  const statusSelect = document.createElement("select");
  const statusOptions = ["completed", "duedatepassed", "incomplete", "cancelled"];
  for (const option of statusOptions) {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    statusSelect.appendChild(optionElement);
  }
  statusSelect.value = status;

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", function () {
    const newValue = input.value.trim();
    const newStartDate = startDateInput.value;
    const newEndDate = endDateInput.value;
    const newStatus = statusSelect.value;
    if (newValue !== "") {
      element.textContent = newValue;
      modal.remove();
    }
  });

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
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













// document.addEventListener("DOMContentLoaded", function() {
//     const addTaskBtn = document.getElementById("addTaskBtn");
//     addTaskBtn.addEventListener("click", addTask);
// });

// function addTask() {
//     const taskName = document.getElementById("taskName").value;
//     if (taskName.trim() === "") {
//         return;
//     }

//     const taskItem = document.createElement("li");
//     taskItem.innerHTML = `
//         <span>${taskName}</span>
//         <button class="addSubTaskBtn">Add Sub-Task</button>
//     `;

//     const addSubTaskBtn = taskItem.querySelector(".addSubTaskBtn");
//     addSubTaskBtn.addEventListener("click", addSubTask);

//     document.getElementById("taskList").appendChild(taskItem);
//     document.getElementById("taskName").value = "";
// }

// function addSubTask(event) {
//     const subTaskName = prompt("Enter sub-task name:");
//     if (subTaskName !== null && subTaskName.trim() !== "") {
//         const subTaskItem = document.createElement("li");
//         subTaskItem.textContent = subTaskName;
//         event.target.parentNode.appendChild(subTaskItem);
//     }
// }


// document.addEventListener("DOMContentLoaded", function() {
//     const addTaskBtn = document.getElementById("addTaskBtn");
//     addTaskBtn.addEventListener("click", addTask);
// });

// let taskIdCounter = 1; // Counter for generating unique IDs

// function addTask() {
//     const taskName = document.getElementById("taskName").value;
//     if (taskName.trim() === "") {
//         return;
//     }

//     const taskId = `${taskIdCounter}`;
//     const taskItem = createTaskElement(taskId, taskName);
//     document.getElementById("taskList").appendChild(taskItem);
//     document.getElementById("taskName").value = "";

//     taskIdCounter++;
// }

// function createTaskElement(taskId, taskName) {
//     const taskItem = document.createElement("li");
//     taskItem.setAttribute("data-task-id", taskId);
//     taskItem.innerHTML = `
//         <span>${taskId}${taskName}</span>
//         <button class="addSubTaskBtn">Add Sub-Task</button>
//     `;

//     const addSubTaskBtn = taskItem.querySelector(".addSubTaskBtn");
//     var subtaskcount = 1;
//     addSubTaskBtn.addEventListener("click", function() {
//         const subTaskName = prompt("Enter sub-task name:");
//         if (subTaskName !== null && subTaskName.trim() !== "") {
//             const subTaskId = `${taskId}-${subtaskcount}`;
//             const subTaskItem = createTaskElement(subTaskId, subTaskName);
//             taskItem.appendChild(subTaskItem);
//             subtaskcount++;

//         }
//     });

//     return taskItem;
// }


//////////////////////newest



// let tasks = [];

// document.addEventListener("DOMContentLoaded", function () {
//   const addTaskBtn = document.getElementById("addTaskBtn");
//   addTaskBtn.addEventListener("click", addTask);
// });

// function addTask() {
//   const taskName = document.getElementById("taskName").value;

//   const task = {
//     id: tasks.length,
//     name: taskName,
//     subTasks: []
//   };

//   tasks.push(task);
//   renderTasks();
  
//   document.getElementById("taskName").value = "";
// }

// function renderTasks() {
//   const taskList = document.getElementById("taskList");
//   taskList.innerHTML = "";

//   tasks.forEach((task, index) => {
//     const taskItem = document.createElement("li");
//     taskItem.innerHTML = `
//       <span>${task.name}</span>
//       <button class="addSubTaskBtn">Add Sub-Task</button>
//       <button class="editTaskBtn">Edit</button>
//       <button class="deleteTaskBtn">Delete</button>
//       <ul class="subTaskList"></ul>
//     `;

//     const addSubTaskBtn = taskItem.querySelector(".addSubTaskBtn");
//     addSubTaskBtn.addEventListener("click", function () {
//       openSubTaskInput(task.subTasks, 0, task.id);
//     });

//     const editTaskBtn = taskItem.querySelector(".editTaskBtn");
//     editTaskBtn.addEventListener("click", function () {
//       openEditModal(taskItem.querySelector("span"), "task", task.id);
//     });

//     const deleteTaskBtn = taskItem.querySelector(".deleteTaskBtn");
//     deleteTaskBtn.addEventListener("click", function () {
//       tasks.splice(index, 1);
//       renderTasks();
//     });

//     taskList.appendChild(taskItem);

//     task.subTasks.forEach((subTask, subIndex) => {
//       const subTaskItem = document.createElement("li");
//       subTaskItem.innerHTML = `
//         <span>${subTask.name}</span>
//         <button class="editSubTaskBtn">Edit</button>
//         <button class="deleteSubTaskBtn">Delete</button>
//       `;

//       const editSubTaskBtn = subTaskItem.querySelector(".editSubTaskBtn");
//       editSubTaskBtn.addEventListener("click", function () {
//         openEditModal(subTaskItem.querySelector("span"), "sub-task", task.id, subIndex);
//       });

//       const deleteSubTaskBtn = subTaskItem.querySelector(".deleteSubTaskBtn");
//       deleteSubTaskBtn.addEventListener("click", function () {
//         task.subTasks.splice(subIndex, 1);
//         renderTasks();
//       });

//       const subTaskList = taskItem.querySelector(".subTaskList");
//       subTaskList.appendChild(subTaskItem);
//     });
//   });
// }

// function openSubTaskInput(subTasks, currentLevel, taskId) {
//   const subTaskName = prompt(`Enter sub-task level ${currentLevel + 1} name:`);
//   if (subTaskName !== null && subTaskName.trim() !== "") {
//     const subTask = {
//       name: subTaskName
//     };
//     subTasks.push(subTask);
//     renderTasks();
//   }
// }

// function openEditModal(element, itemType, taskId, subTaskIndex) {
//   const newValue = prompt("Edit " + (itemType === "task" ? "task" : "sub-task") + ":", element.textContent);
  
//   if (newValue !== null && newValue.trim() !== "") {
//     if (itemType === "task") {
//       tasks[taskId].name = newValue;
//       renderTasks();
//     } else if (itemType === "sub-task") {
//       tasks[taskId].subTasks[subTaskIndex].name = newValue;
//       renderTasks();
//     }
//   }
// }
