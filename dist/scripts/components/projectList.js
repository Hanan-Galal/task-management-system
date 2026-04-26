var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { base } from "./Base.js";
import { projectState } from "../store/ProjectState.js";
import { Project } from "./project.js";
import { autoBind } from "./autoBind.js";
import { ProjectRules } from "../store/ProjectRules.js";
export class ProjectList extends base {
    constructor(listId, title, hostId) {
        super('list', hostId, false, `${listId}-projects`);
        this.listId = listId;
        this.title = title;
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
        this._element.querySelector('.delete-list').addEventListener('click', () => {
            if (confirm('Delete List?'))
                projectState.deleteList(this.listId);
        });
    }
    renderContent() {
        this._element.querySelector('h1').textContent = this.title;
        const ul = this._element.querySelector('ul');
        ul.id = `${this.listId}-list`;
    }
    renderProjects(projects) {
        const listEl = document.getElementById(`${this.listId}-list`);
        listEl.innerHTML = '';
        for (const prjItem of projects) {
            new Project(listEl.id, prjItem);
        }
    }
    dropHandler(e) {
        const id = e.dataTransfer.getData('text/plain');
        projectState.changeProjectStatus(id, this.listId);
    }
}
__decorate([
    autoBind
], ProjectList.prototype, "dropHandler", null);
//# sourceMappingURL=projectList.js.map