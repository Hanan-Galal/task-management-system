import { base } from "./Base.js";
import { projectState } from "../store/ProjectState.js";
import { Project } from "./project.js";
import { autoBind } from "./autoBind.js";
import { ProjectRules } from "../store/ProjectRules.js";

export class ProjectList extends base<HTMLDivElement> {
    constructor(private listId: string, private title: string, hostId: string) {
        super('list', hostId, false, `${listId}-projects`);
        this.renderContent();
        this.configure();
    }

configure() {
    projectState.pushListener((projects) => {
        const relevantProjects = projects.filter(prj => {
            
            return String(prj.status) === String(this.listId);
        });
        this.renderProjects(relevantProjects);
    });

    this._element.querySelector('.delete-list')!.addEventListener('click', () => {
        if(confirm('Delete List?')) projectState.deleteList(this.listId);
    });
}

    renderContent() {
        this._element.querySelector('h1')!.textContent = this.title;
        const ul = this._element.querySelector('ul')!;
        ul.id = `${this.listId}-list`;
    }

private renderProjects(projects: ProjectRules[]) {
    const listEl = document.getElementById(`${this.listId}-list`)! as HTMLUListElement;
    listEl.innerHTML = ''
    for (const prjItem of projects) {
        new Project(listEl.id, prjItem);
    }
}

    @autoBind
    private dropHandler(e: DragEvent) {
        const id = e.dataTransfer!.getData('text/plain');
        projectState.changeProjectStatus(id, this.listId);
    }
}