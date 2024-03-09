const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
document.getElementById('launchModal').addEventListener('click', function() {
  modal.show();
})
document.getElementById('modal_close_button').addEventListener('click', function() {
  modal.hide();
  const taskForm = document.getElementById('task_form')
  taskForm.reset();
})
document.getElementById('modal_exit_button').addEventListener('click', function() {
  modal.hide();
  const taskForm = document.getElementById('task_form')
  taskForm.reset();
})

document.getElementById('add_task_button').addEventListener('click', function(event) {
  event.preventDefault();
  if (validateForm(event)) {
    modal.hide(); 
    addTask();
  }
 
});

document.getElementById('task_details').addEventListener('input', function(event) {
  validateForm(event);
});



// const add_task_button = document.getElementById('add-task-button');
// add_task_button.addEventListener('click', addTask)

function validateForm(event) {
  const validateTaskDetails = document.getElementById('task_details');
  const existingErrorMsg = validateTaskDetails.parentNode.querySelector('.error_message');
  if (!validateTaskDetails.value) {
    validateTaskDetails.style.outline = "4px solid rgba(252, 0, 0, 0.6)";
    validateTaskDetails.style.transition = "outline 0.1s ease";
    if (!existingErrorMsg) {
      const errorMsg = document.createElement('p');
      errorMsg.style.color = 'red'
      errorMsg.className = 'error_message'
      errorMsg.style.marginTop = '5px'
      errorMsg.textContent = 'You must give your task a name/details';
      validateTaskDetails.parentNode.appendChild(errorMsg)
    }
    event.preventDefault();
    return false;
  } else {
    validateTaskDetails.style.outline = "none";
    if (existingErrorMsg) {
      existingErrorMsg.parentNode.removeChild(existingErrorMsg);
    }
    return true
  }
}

const Tasklist = [];

function addTask() {
  const taskDetails = document.getElementById('task_details').value;
  const taskPriority = document.getElementById('task_priority').value;
  const taskDueDate = document.getElementById('task_due_date').value;
  var task = document.createElement('div');
  task.id = 'card-div'
  task.className = 'card custom-card shadow'
  task.style.outline = `4px solid ${taskPriority}`
  task.innerHTML = `<div class="card-body" style="position: relative; min-height: 100px"><div style="overflow: auto; min-height: 110px;max-height: 110px; margin-bottom: 5px;"><p style="margin-right: 5px;">${taskDetails}</p></div><div><p style="font-weight: 600; font-size: 14px;" id="due-date">${taskDueDate ? 'Due by: ' + taskDueDate : ''}</p></div><div class="d-flex" style="position: absolute; left: 0; bottom: 0; right: 0; margin: 0; "><button type="button" id="complete_button" class="btn btn-success" style="width:50%; font-size: 10px; padding: 5px; margin: 5px;z-index: 6;">Complete</button><button type="button" id="delete_button" class="btn btn-danger" style="width:50%; font-size: 10px; padding: 5px; margin: 5px;z-index: 6;">Delete</button></div></div>`

  Tasklist.push(task)

  task.querySelector('#complete_button').addEventListener('click', function() {
    handleComplete(task, Tasklist.indexOf(task));
  });

  task.querySelector('#delete_button').addEventListener('click', function() {
    Tasklist.pop(task);
    document.getElementById('toDoList').removeChild(task);
  })
 
  document.getElementById('toDoList').innerHTML = '';
  Tasklist.forEach(task => {
    document.getElementById('toDoList').appendChild(task)
  })
  const taskForm = document.getElementById('task_form')
  taskForm.reset();
}
  


function handleComplete(task, index) {
  let complete_button = task.querySelector('#complete_button');
  var dueDate = task.querySelector('#due-date');
  var celebrationSound = new Audio('success_ding/Success ding Sound Effect (download).mp3');
  celebrationSound.volume = .50;
  complete_button.innerHTML = complete_button.innerHTML === 'Completed' ? 'Complete' : 'Completed';

  if (complete_button.innerHTML === 'Completed') {
      var cardCover = document.createElement("div")
      cardCover.id = "cardCover_" + index;
      cardCover.style.position = "absolute";
      cardCover.style.top = "0";
      cardCover.style.left = "0";
      cardCover.style.height = "100%";
      cardCover.style.width = "100%";
      cardCover.style.zIndex = "5";
      cardCover.style.backgroundColor = "gray";
      cardCover.style.opacity = ".75";

      if (dueDate) {
        dueDate.style.textDecoration = "line-through";
      }
      task.appendChild(cardCover);
      celebrationSound.play();
  } else {
    var cardCover = document.getElementById('cardCover_' + index);
    if (cardCover) {
          cardCover.remove();
    }
    if (dueDate) {
      dueDate.style.textDecoration = "none";
    }
  }
}


