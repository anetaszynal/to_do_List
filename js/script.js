{
    

    const tasks = [];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li>${task.content}
            </li>`;
        }
        document.querySelector(".js-taskList").innerHTML = htmlString;
    }


    const init = () => {
        

        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-enterNewTask").value;

        if (newTask === "") {
            return
        }

        tasks.push({
            content: newTask,
        });

        render();

        });      
        
    }

    init();
}