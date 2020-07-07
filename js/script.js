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

    const bindToggleDoneEvents = () => {
        const toggleTaskElement = document.querySelectorAll(".js-taskDoneButton");
        toggleTaskElement.forEach((toggleTaskButton, index) => {
            toggleTaskButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const deleteTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const bindRemoveEvents = () => {
        const deleteTaskElement = document.querySelectorAll(".js-deleteTaskButton");
        deleteTaskElement.forEach((deleteTaskButton, index) => {
            deleteTaskButton.addEventListener("click", () => {
                deleteTask(index);
            });
        });
    };

    const render = () => {
        let newTaskRow = "";
        let toggleVisabilityTaskDoneButton = "";

        for (const task of tasks) {
            newTaskRow += `
            <li class="list__items">
              <button class="list__button js-taskDoneButton">
                ${task.done ? "✔" : ""}
                </button>
              <span class="list__tasksName ${task.done ? "list__taskName--done" : ""}">
                ${task.content}
              </span>
              <button class="list__button list__button--deleted js-deleteTaskButton">
              🗑
              </button>
            </li>`;
            toggleVisabilityTaskDoneButton += `
            Lista zadań
            <button class="section__button--markTaskDone">
            Pokaż ukończone
            </button>
            <button class="section__button--markTaskDone">
            Ukończ wszystkie
            </button>`
        };
        document.querySelector(".js-taskList").innerHTML = newTaskRow;
        document.querySelector(".js-toggleTaskButton").innerHTML=toggleVisabilityTaskDoneButton;
        bindToggleDoneEvents();
        bindRemoveEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-enterNewTask").value.trim();

        if (newTaskElement === "") {
            return;
        };
        addNewTask(newTaskElement);
        resetForm();
    };

    const resetForm = () => {
        document.querySelector(".js-form").reset();
    };

    const onFormFocus = () => {
        const focusOnImputElement = document.querySelector(".js-addTaksButton");
        focusOnImputElement.addEventListener("click", () => {
            document.querySelector(".js-enterNewTask").focus();
        });

    };

    const init = () => {
        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit);
        onFormFocus();
    };

    init();
}