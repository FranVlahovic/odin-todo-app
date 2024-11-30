import { openTaskDialogBtn, closeTaskDialogBtn } from "./modules/tasks";
import { openProjectDialogBtn, cancelAddProject, addProject, initializeProjects } from "./modules/projects";

initializeProjects();
openProjectDialogBtn();
openTaskDialogBtn();
closeTaskDialogBtn();
cancelAddProject();
addProject();