// Project Template
const createProject = (name) => {
    const id = Date.now();

    return {
        projectId: id,
        projectName: name,
    };
};
// const addTaskDialog = document.querySelector('.task-dialog');

// const openTaskDialogBtn = () => {
//     const addTaskBtn = document.querySelector('.add-task');

//     addTaskBtn.addEventListener("click", () => {
//         openTaskDialog();
//     });
// };

// const openTaskDialog = () => {
//     addTaskDialog.showModal();
// };


const addProjectDialog = document.querySelector('.project-dialog');

// Open Project Dialog Button
const openProjectDialogBtn = () => {
    const addProjectBtn = document.querySelector('.add-project');

    addProjectBtn.addEventListener("click", () => {
        openProjectDialog();
    });
};

// Opens Project Dialog
const openProjectDialog = () => {
    addProjectDialog.showModal();
};

// Closes Project Dialog
const closeAddProjectDialog = () => {
    addProjectDialog.close();
};

// Dialog Form Cancel
const cancelAddProject = () => {
    const cancelBtn = document.querySelector('.cancel-btn');
    const projectInput = document.querySelector('.project-name-input');

    cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        projectInput.value = '';
        closeAddProjectDialog();
    });
}

const addProject = () => {
    const projectForm = document.querySelector('.project-form');
    const projectInput = document.querySelector('.project-name-input');

    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const projectInputValue = projectInput.value.trim();
        if (projectInputValue){
            addProjectInArray(createProject(projectInputValue));
            projectInput.value = '';
            closeAddProjectDialog();
            renderProjectToNav();
        };
    });
};
// Project Array
const projectArray = [];

const addProjectInArray = (project) => {
    projectArray.push(project);
    console.log(`Current Projects: ${projectArray}`);
};

const renderProjectToNav = () => {
    const projectsContainer = document.querySelector('.projects-container');
    projectsContainer.innerHTML = '';

    projectArray.forEach(({ projectName, projectId }) => {
        projectsContainer.innerHTML += `
            <li class="project-item" data-id="${projectId}">        
                <h4>${projectName}</h4>
                <button class="project-edit-btn" data-id="${projectId}">
                    <img src="assets/icons/square-edit-outline.svg" alt="Project Edit Button">
                </button>
                <button class="project-delete-btn" data-id="${projectId}">
                    <img src="assets/icons/delete.svg" alt="Project Delete Button">
                </button>
            </li>`;
    });
    projectEventListeners();
};

const projectEventListeners = () => {
    document.querySelectorAll('.project-edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = e.target.closest('button').dataset.id;
            handleEditProject(projectId);
        });
    });

    document.querySelectorAll('.project-delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = e.target.closest('button').dataset.id;
            handleDeleteProject(projectId);
        });
    });
};
const handleEditProject = (projectId) => {
    projectId = Number(projectId);
    const project = projectArray.find(p => p.projectId === projectId);
    if (project){
        openProjectDialog();
    }
};

const handleDeleteProject = (projectId) => {
    projectId = Number(projectId);
    const projectIndex = projectArray.findIndex(p => p.projectId === projectId);
    if (projectIndex !== -1){
        projectArray.splice(projectIndex, 1);
        renderProjectToNav();
    }
};
openProjectDialogBtn();
cancelAddProject();
addProject();
