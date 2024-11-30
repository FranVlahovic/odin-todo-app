import Storage from "./storage";
const { saveProjectsLocal, loadProjectsLocal } = Storage();

// Project Template
const createProject = (name) => {
    const id = Date.now();

    return {
        projectId: id,
        projectName: name,
        tasks: [],
    };
};

// Project ID Utility
let currentProjectId = null;

const setCurrentProjectId = (projectId) => {
    currentProjectId = projectId;
};

const clearCurrentProjectId = () => {
    currentProjectId = null;
};

const getCurrentProjectId = () => {
    return currentProjectId;
};
//

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
// Add Project Logic
const addProject = () => {
    const projectForm = document.querySelector('.project-form');
    const projectInput = document.querySelector('.project-name-input');

    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const projectInputValue = projectInput.value.trim();
        const projectIdValue = getCurrentProjectId();

        if (projectInputValue){
            if(projectIdValue){
                updateProject(projectIdValue, projectInputValue);
            }
            else {
                addProjectInArray(createProject(projectInputValue));
            }
            projectInput.value = '';
            clearCurrentProjectId();
            closeAddProjectDialog();
            saveProjectsLocal(projectArray);
            renderProjectToNav();
        };
    });
};

let projectArray = [];

// Adds Project Inside Array
const addProjectInArray = (project) => {
    projectArray.push(project);
    saveProjectsLocal(projectArray);
    console.log(`Current Projects: ${projectArray}`);
};

// Renders Project From Array to Nav
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

// Project Edit & Delete Buttons Action
const projectEventListeners = () => {
    const projectBtns =  document.querySelectorAll('.project-edit-btn, .project-delete-btn');
    
    projectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = e.target.closest('button').dataset.id;
            if (btn.classList.contains('project-edit-btn')) {
                handleEditProject(projectId);
            } else if (btn.classList.contains('project-delete-btn')) {
                handleDeleteProject(projectId);
            }
        });
    });
};

// Project Edit 
const handleEditProject = (projectId) => {
    projectId = Number(projectId);
    const project = projectArray.find(p => p.projectId === projectId);
    if (project){
        const projectInput = document.querySelector('.project-name-input');
        projectInput.value = project.projectName;
        setCurrentProjectId(project.projectId);
        openProjectDialog();
    }
};

// Project Delete
const handleDeleteProject = (projectId) => {
    projectId = Number(projectId);
    const projectIndex = projectArray.findIndex(p => p.projectId === projectId);
    if (projectIndex !== -1){
        projectArray.splice(projectIndex, 1);
        saveProjectsLocal(projectArray);
        renderProjectToNav();
    }
};

// Updates Project When Finished Editing
const updateProject = (projectId, projectName) => {
    const projectIndex = projectArray.findIndex(p => p.projectId === projectId); 
    if (projectIndex !== -1) { 
        projectArray[projectIndex].projectName = projectName;
        saveProjectsLocal(projectArray);
    }
}

// Initizalizes Projects From Local Storage
const initializeProjects = () => { 
    projectArray = loadProjectsLocal();
    renderProjectToNav(); 
};

export { openProjectDialogBtn, cancelAddProject, addProject, initializeProjects };