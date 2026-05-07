var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { projectState } from '../store/ProjectState.js';
import { base } from './Base.js';
import { autoBind } from './autoBind.js';
import { Popup } from './Popup.js';
export class Project extends base {
    constructor(hostId, task, popup) {
        super('project-item', hostId, false, task.id);
        this.task = task;
        this.popup = popup;
        this._renderContent();
        this._bindEvents();
    }
    _renderContent() {
        this._element.querySelector('h2').textContent = this.task.title;
        this._element.querySelector('p').textContent = this.task.description;
    }
    _bindEvents() {
        this._element.querySelector('.delete')
            .addEventListener('click', this._onDelete);
        this._element.querySelector('.edit')
            .addEventListener('click', this._onEdit);
        this._element.addEventListener('dragstart', this._onDragStart);
        this._element.addEventListener('dragend', this._onDragEnd);
    }
    _onDelete() {
        if (confirm('Are you sure you want to delete this task?')) {
            projectState.deleteProjects(this.task.id);
        }
    }
    _onEdit() {
        this.popup.open(this.task.id, this.task.title, this.task.description);
    }
    _onDragStart(e) {
        e.dataTransfer.setData('text/plain', this.task.id);
        e.dataTransfer.effectAllowed = 'move';
        this._element.classList.add('dragging');
    }
    _onDragEnd() {
        this._element.classList.remove('dragging');
    }
}
__decorate([
    autoBind
], Project.prototype, "_onDelete", null);
__decorate([
    autoBind
], Project.prototype, "_onEdit", null);
__decorate([
    autoBind
], Project.prototype, "_onDragStart", null);
__decorate([
    autoBind
], Project.prototype, "_onDragEnd", null);
//# sourceMappingURL=project.js.map