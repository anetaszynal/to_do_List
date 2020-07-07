{
    let tasks = [];

    const addNewTask = (newTask) => {
        tasks.push({
            content: newTask,
            done: false,
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

    const markAllAsDone = () => {
        tasks = tasks.map(todoTask => {
            return { ...todoTask, done: true }
        })
      
        render();
    };

    const selectAllTaskAsDone = () => {
        const selectAllTaskElement = document.querySelector(".js-selectAll");
        selectAllTaskElement.addEventListener("click", () => {
            markAllAsDone();

        });
    };


    const render = () => {
        let newTaskRow = "";

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
        };
        document.querySelector(".js-taskList").innerHTML = newTaskRow;
        deleteButtonsFromHeadline();
        bindToggleDoneEvents();
        bindRemoveEvents();
        selectAllTaskAsDone();

    };

    const addButtonsToHeadline = () => {
        document.querySelector(".js-toggleTaskButton").innerHTML = `
        Lista zadań
        <button class="section__button--markTaskDone js-selectAll">
        Ukończ wszystkie
        </button>
        <button class="section__button--markTaskDone">
        Pokaż ukończone
        </button>`
    }

    const deleteButtonsFromHeadline = () => {
        if (tasks.length === 0) {
            return document.querySelector(".js-toggleTaskButton").innerHTML = `Lista zadań`
        };
        addButtonsToHeadline();
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