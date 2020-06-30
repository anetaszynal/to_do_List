{
    const tasks = [];

    const addNewTask = (newTask) => {
        tasks.push({
            content: newTask,
        });

        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done
        render()
    }

    const deleteTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);

        render();
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__items"><button class="list__button ${task.done ? "list__button--done" : ""} js-taskDone"></button> <span class="list__task ${task.done ? "list__task--done" : ""}">${task.name}</span><button class="list__button list__button--deleted js-deleteTask"></button>
            </li>`;
        }
        document.querySelector(".js-taskList").innerHTML = htmlString;

        const toggleTaskButtons = document.querySelectorAll(".js-taskDone");
        toggleTaskButtons.forEach((toggleTaskButton, index) => {
             toggleTaskButton.addEventListener("click", () => {
                 toggleTaskDone(index);
             })
        })

        const deleteTaskButtons = document.querySelectorAll(".js-deleteTask");

        deleteTaskButtons.forEach((deleteTaskButton, index) => {
            deleteTaskButton.addEventListener("click", () => {
                deleteTask(index);

            });

        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTask = document.querySelector(".js-enterNewTask").value;

        if (newTask === "") {
            return;
        }
        addNewTask(newTask);
    }


    const init = () => {
        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", onFormSubmit);
    };

    init();
}