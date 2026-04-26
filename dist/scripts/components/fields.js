var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { projectState } from "../store/ProjectState.js";
import { base } from "./Base.js";
import { autoBind } from "./autoBind.js";
export class Fields extends base {
    constructor() {
        super('fields', 'app', true, 'forms-container');
        this.configure();
    }
    configure() {
        const taskForm = this._element.querySelector('#task-form');
        const listForm = this._element.querySelector('#list-form');
        if (taskForm) {
            taskForm.addEventListener('submit', this.submitTask);
        }
        if (listForm) {
            listForm.addEventListener('submit', this.submitList);
        }
        projectState.pushListener((_, lists) => {
            const select = this._element.querySelector('#task-list-select');
            if (select) {
                select.innerHTML = lists
                    .map(l => `<option value="${l.id}">${l.title}</option>`)
                    .join('');
            }
        });
    }
    submitTask(e) {
        e.preventDefault();
        const titleEl = this._element.querySelector('#task-title');
        const descEl = this._element.querySelector('#task-desc');
        const listSelect = this._element.querySelector('#task-list-select');
        const title = titleEl.value.trim();
        const desc = descEl.value.trim();
        const listId = listSelect.value;
        if (title && desc && listId) {
            projectState.createProject(title, desc, listId);
            titleEl.value = '';
            descEl.value = '';
        }
        else {
            alert('Please fill all fields');
        }
    }
    submitList(e) {
        e.preventDefault();
        const input = this._element.querySelector('#list-title');
        const listTitle = input.value.trim();
        if (listTitle) {
            projectState.addList(listTitle);
            input.value = '';
        }
    }
}
__decorate([
    autoBind
], Fields.prototype, "submitTask", null);
__decorate([
    autoBind
], Fields.prototype, "submitList", null);
//# sourceMappingURL=fields.js.map