import { ProjectRules } from "./ProjectRules.js";
class ProjectState {
    constructor() {
        this.projects = [];
        this.lists = [];
        this.listeners = [];
        const savedProjects = localStorage.getItem('projects');
        const savedLists = localStorage.getItem('lists');
        this.projects = savedProjects ? JSON.parse(savedProjects) : [];
        this.lists = savedLists ? JSON.parse(savedLists) : [
            { id: 'Inital', title: 'Inital' },
            { id: 'Active', title: 'Active' },
            { id: 'Finished', title: 'Finished' }
        ];
    }
    static getInstance() {
        if (!this.instance)
            this.instance = new ProjectState();
        return this.instance;
    }
    pushListener(fn) {
        this.listeners.push(fn);
        fn([...this.projects], [...this.lists]);
    }
    addList(title) {
        const newList = { id: Math.random().toString(), title };
        this.lists.push(newList);
        this.update();
    }
    deleteList(listId) {
        this.lists = this.lists.filter(l => l.id !== listId);
        this.projects = this.projects.filter(p => p.status !== listId);
        this.update();
    }
    createProject(title, desc, listId) {
        const newPrj = new ProjectRules(Math.random().toString(), title, desc, listId);
        this.projects.push(newPrj);
        this.update();
    }
    updateTask(id, newTitle, newDesc) {
        const project = this.projects.find(p => p.id === id);
        if (project) {
            project.title = newTitle;
            project.description = newDesc;
            this.update();
        }
    }
    deleteProjects(id) {
        this.projects = this.projects.filter(p => p.id !== id);
        this.update();
    }
    changeProjectStatus(id, newStatus) {
        const prj = this.projects.find(p => p.id === id);
        if (prj) {
            prj.status = newStatus;
            this.update();
        }
    }
    update() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
        localStorage.setItem('lists', JSON.stringify(this.lists));
        this.listeners.forEach(fn => fn([...this.projects], [...this.lists]));
    }
}
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=ProjectState.js.map