const Storage = () => {
    const saveProjectsLocal = (projects) => {
        localStorage.setItem('projects', JSON.stringify(projects));

    };

    const loadProjectsLocal = () => {
        const savedProjects = localStorage.getItem('projects');
        return savedProjects ? JSON.parse(savedProjects) : [];

    };

    return {
        saveProjectsLocal, loadProjectsLocal
    };
};

export default Storage;