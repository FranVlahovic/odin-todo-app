const addTaskDialog = document.querySelector('.task-dialog');

const openTaskDialog = () => {
    addTaskDialog.showModal();
};

const closeTaskDialog = () => {
    addTaskDialog.close();
};

const openTaskDialogBtn = () => {
    const addTaskBtn = document.querySelector('.add-task');

    addTaskBtn.addEventListener("click", () => {
        openTaskDialog();
    });
};
const closeTaskDialogBtn = () => {
    const closeTaskBtn = document.querySelector('.cancel-task-btn');
    const taskForm = document.querySelector('.task-form');
    closeTaskBtn.addEventListener("click", (e) => {
        e.preventDefault();
        taskForm.reset();
        closeTaskDialog();
    });
};

export { openTaskDialogBtn, closeTaskDialogBtn };