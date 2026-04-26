import { ProjectRules } from "./ProjectRules.js";

export interface List {
    id: string;
    title: string;
}

type Listener = (projects: ProjectRules[], lists: List[]) => void;

class ProjectState {
    private projects: ProjectRules[] = [];
    private lists: List[] = [];
    private listeners: Listener[] = [];
    private static instance: ProjectState;

    private constructor() {
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
        if (!this.instance) this.instance = new ProjectState();
        return this.instance;
    }

    pushListener(fn: Listener) {
        this.listeners.push(fn);
        fn([...this.projects], [...this.lists]);
    }

    addList(title: string) {
        const newList = { id: Math.random().toString(), title };
        this.lists.push(newList);
        this.update();
    }

    deleteList(listId: string) {
        this.lists = this.lists.filter(l => l.id !== listId);
        this.projects = this.projects.filter(p => p.status !== listId as any);
        this.update();
    }

    createProject(title: string, desc: string, listId: string) {
        const newPrj = new ProjectRules(Math.random().toString(), title, desc, listId as any);
        this.projects.push(newPrj);
        this.update();
    }

    public updateTask(id: string, newTitle: string, newDesc: string) {
        const project = this.projects.find(p => p.id === id);
        if (project) {
            project.title = newTitle;
            project.description = newDesc;
            this.update();
        }
    }

    public deleteProjects(id: string) {
        this.projects = this.projects.filter(p => p.id !== id);
        this.update(); 
    }

    changeProjectStatus(id: string, newStatus: string) {
        const prj = this.projects.find(p => p.id === id);
        if (prj) {
            prj.status = newStatus as any;
            this.update();
        }
    }

    private update() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
        localStorage.setItem('lists', JSON.stringify(this.lists));
        this.listeners.forEach(fn => fn([...this.projects], [...this.lists]));
    }
}

export const projectState = ProjectState.getInstance();