
document.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task));
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = { text: taskText, completed: false };
        addTaskToList(task);
        saveTasksToLocalStorage();
        taskInput.value = '';
    }
}

function addTaskToList(task) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('li');
    const deleteButton = document.createElement('button');
    
    taskItem.innerText = task.text;
    taskItem.className = task.completed ? 'completed' : '';
    taskItem.addEventListener('click', () => toggleTaskCompletion(taskItem, task));
    
    deleteButton.innerText = '❌'; 
    deleteButton.addEventListener('click', (event) => deleteTask(event, taskItem, task));
    
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

function toggleTaskCompletion(taskItem, task) {
    task.completed = !task.completed;
    taskItem.classList.toggle('completed');
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('#taskList li')).map(taskItem => ({
        text: taskItem.innerText,
        completed: taskItem.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(event, taskItem, task) {
    event.stopPropagation(); 
    taskItem.remove();
    saveTasksToLocalStorage();
}
