{
    const tasks = [];

    const addNewTask = (newTask) => {
        tasks.push({
            content: newTask,
        });
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done
        render();
    };

    const deleteTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const render = () => {
        let newTaskRow = "";

        for (const task of tasks) {
            newTaskRow += `<li class="list__items">
            <button class="list__button ${task.done ? "list__button--done" : ""} js-taskDoneButton"></button>
            <span class="list__tasksName ${task.done ? "list__taskName--done" : ""}">${task.content}</span>
            <button class="list__button list__button--deleted js-deleteTaskButton"></button>
            </li>`;
        };
        document.querySelector(".js-taskList").innerHTML = newTaskRow;

        const toggleTaskElement = document.querySelectorAll(".js-taskDoneButton");
        toggleTaskElement.forEach((toggleTaskButton, index) => {
            toggleTaskButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        const deleteTaskElement = document.querySelectorAll(".js-deleteTaskButton");
        deleteTaskElement.forEach((deleteTaskButton, index) => {
            deleteTaskButton.addEventListener("click", () => {
                deleteTask(index);
            });
        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-enterNewTask").value.trim();

        if (newTaskElement === "") {
            return;
        };
        addNewTask(newTaskElement);
    };

    const init = () => {
        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit);
    };

    init();
}