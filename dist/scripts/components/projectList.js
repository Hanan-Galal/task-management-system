var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { base } from './Base.js';
import { projectState } from '../store/ProjectState.js';
import { Project } from './project.js';
import { Popup } from './Popup.js';
import { autoBind } from './autoBind.js';
import { ProjectRules } from '../store/ProjectRules.js';
export class ProjectList extends base {
    constructor(listId, title, hostId, popup) {
        super('list', hostId, false, `${listId}-projects`);
        this.listId = listId;
        this.title = title;
        this.popup = popup;
        if (!this._element) {
            this._renderManualList();
        }
        this._renderContent();
        this._bindEvents();
    }
    _renderManualList() {
        const div = document.createElement('div');
        div.id = `${this.listId}-projects`;
        div.className = 'projects';
        div.style.opacity = '0';
        div.style.backgroundColor = '#f8f9fa';
        div.innerHTML = `
            <header class="title-header">
                <h1 class="title"></h1>
                <button class="delete-list">X</button>
            </header>
            <ul class="project-list" style="min-height: 150px;"></ul>
        `;
        const host = document.getElementById('app');
        host.appendChild(div);
        this._element = div;
        requestAnimationFrame(() => {
            div.style.transition = 'opacity 0.25s ease-out';
            div.style.opacity = '1';
        });
    }
    _renderContent() {
        if (!this._element)
            return;
        const header = this._element.querySelector('h1');
        const ul = this._element.querySelector('ul');
        if (header)
            header.textContent = this.title;
        if (ul)
            ul.id = `${this.listId}-list`;
    }
    _bindEvents() {
        if (!this._element)
            return;
        projectState.pushListener((projects) => {
            const relevant = projects.filter(p => String(p.status) === String(this.listId));
            this._renderProjects(relevant);
        });
        const deleteBtn = this._element.querySelector('.delete-list');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                if (confirm('Delete this list and all its tasks?')) {
                    projectState.deleteList(this.listId);
                }
            });
        }
        this._element.addEventListener('dragover', this._onDragOver);
        this._element.addEventListener('dragleave', this._onDragLeave);
        this._element.addEventListener('drop', this._onDrop);
    }
    _renderProjects(projects) {
        const listEl = document.getElementById(`${this.listId}-list`);
        if (!listEl)
            return;
        listEl.innerHTML = '';
        projects.forEach(task => new Project(listEl.id, task, this.popup));
    }
    _onDragOver(e) {
        e.preventDefault();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = 'move';
        }
        this._element.classList.add('drag-over');
    }
    _onDragLeave(e) {
        if (!this._element.contains(e.relatedTarget)) {
            this._element.classList.remove('drag-over');
        }
    }
    _onDrop(e) {
        var _a;
        e.preventDefault();
        this._element.classList.remove('drag-over');
        const taskId = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('text/plain');
        if (taskId) {
            projectState.changeProjectStatus(taskId, this.listId);
        }
    }
}
__decorate([
    autoBind
], ProjectList.prototype, "_onDragOver", null);
__decorate([
    autoBind
], ProjectList.prototype, "_onDragLeave", null);
__decorate([
    autoBind
], ProjectList.prototype, "_onDrop", null);
//# sourceMappingURL=projectList.js.map