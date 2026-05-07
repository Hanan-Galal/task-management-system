var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { projectState } from '../store/ProjectState.js';
import { base } from './Base.js';
import { autoBind } from './autoBind.js';
export class Fields extends base {
    constructor() {
        super('fields', 'app', true, 'forms-container');
        this._taskForm = this._element.querySelector('#task-form');
        this._listForm = this._element.querySelector('#list-form');
        this._taskTitle = this._element.querySelector('#task-title');
        this._taskDesc = this._element.querySelector('#task-desc');
        this._listTitle = this._element.querySelector('#list-title');
        this._listSelect = this._element.querySelector('#task-list-select');
        this._bindEvents();
    }
    _bindEvents() {
        this._taskForm.addEventListener('submit', this._onSubmitTask);
        this._listForm.addEventListener('submit', this._onSubmitList);
        projectState.pushListener((_, lists) => {
            this._listSelect.innerHTML = lists
                .map(l => `<option value="${l.id}">${l.title}</option>`)
                .join('');
        });
    }
    _onSubmitTask(e) {
        e.preventDefault();
        const title = this._taskTitle.value.trim();
        const desc = this._taskDesc.value.trim();
        const listId = this._listSelect.value;
        if (!title || !desc || !listId) {
            alert('Please fill all fields');
            return;
        }
        projectState.createProject(title, desc, listId);
        this._taskTitle.value = '';
        this._taskDesc.value = '';
        this._listSelect.selectedIndex = 0;
        this._taskTitle.focus();
    }
    _onSubmitList(e) {
        e.preventDefault();
        const title = this._listTitle.value.trim();
        if (!title)
            return;
        projectState.addList(title);
        this._listTitle.value = '';
        this._listTitle.focus();
    }
}
__decorate([
    autoBind
], Fields.prototype, "_onSubmitTask", null);
__decorate([
    autoBind
], Fields.prototype, "_onSubmitList", null);
//# sourceMappingURL=fields.js.map