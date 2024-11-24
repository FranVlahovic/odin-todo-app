// Create Project
const createProject = (name) => {
    const id = Date.now().valueOf();

    return {
        projectId: id,
        projectName: name,
    };
};

// Dialogs
const addProjectDialog = document.querySelector('.project-dialog');

const openAddProjectDialog = () => {
    const addProjectBtn = document.querySelector('.add-project');

    addProjectBtn.addEventListener("click", () => {
        addProjectDialog.showModal();
    });
};

const closeAddProjectDialog = () => {
    addProjectDialog.close();
};

// Project Form
const cancelAddProject = () => {
    const cancelBtn = document.querySelector('.cancel-btn');

    cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
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

    projectArray.forEach(({projectName, projectId}) => {
        projectsContainer.innerHTML += `
        <li class="project-item">        
            <h4>${projectName}</h4>
            <button class="project-edit-btn"><img src="assets/icons/square-edit-outline.svg" alt="Project Edit Button"></button>
            <button class="project-delete-btn"><img src="assets/icons/delete.svg" alt="Project Delete Button"></button>
        </li>`;
    });
};

openAddProjectDialog();
cancelAddProject();
addProject();
